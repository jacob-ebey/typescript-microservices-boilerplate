import * as bcrypt from 'bcrypt'
import * as joi from 'joi'
import * as jwt from 'jsonwebtoken'
const rand = require('rand-token')

import { ExpressMiddleware, UserModel } from '@packages/core'

import { db } from './db'

const getUserQuery = 'MATCH (n:User { username: {username} }) RETURN n'
const getUserByRefreshQuery = 'MATCH (n:User { refreshToken: {refreshToken} }) RETURN n'

function getUser (username: string): Promise<UserModel> {
  return new Promise((resolve, reject) => {
    return db.query(getUserQuery, { username }, (err: Error, results: UserModel[]) => {
      if (err) {
        return reject(err)
      }

      return resolve(results[0])
    })
  })
}

function getUserByRefreshToken (refreshToken: string): Promise<UserModel> {
  return new Promise((resolve, reject) => {
    return db.query(getUserByRefreshQuery, { refreshToken }, (err: Error, results: UserModel[]) => {
      if (err) {
        return reject(err)
      }

      return resolve(results[0])
    })
  })
}

function createResponse (user: UserModel) {
  return new Promise((resolve, reject) => {
    const token = jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone
    }, process.env.JWT_SECRET || '')

    const refreshToken = rand.uid(256)

    db.save(user, 'refreshToken', refreshToken, (err: Error) => {
      if (err) {
        return reject(err)
      }

      resolve({
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        token,
        refreshToken
      })
    })
  })
}

export const routes: ExpressMiddleware[] = [
  {
    method: 'post',
    path: '/login',
    bodySchema: joi.object().keys({
      username: joi.string().required(),
      password: joi.string().required()
    }).required(),
    handler: (req, res) => {
      return getUser(req.body.username)
        .then(async (user: UserModel) => {
          try {
            if (user) {
              const found = await bcrypt.compare(req.body.password, user.password)
              if (found === true) {
                res.json(await createResponse(user))
              } else {
                res.status(403).send()
              }
            } else {
              res.status(403).send()
            }
          } catch (err) {
            res.status(500)
          }
        })
        .catch(() => res.status(500).send())
    }
  },
  {
    method: 'post',
    path: '/refresh',
    bodySchema: joi.object().keys({
      refreshToken: joi.string().required()
    }),
    handler: async (req, res) => {
      try {
        const user = await getUserByRefreshToken(req.body.refreshToken)

        if (user) {
          res.json(await createResponse(user))
        } else {
          res.status(403).send()
        }
      } catch (err) {
        res.status(403).send()
      }
    }
  },
  {
    method: 'post',
    path: '/signup',
    bodySchema: joi.object().keys({
      username: joi.string().required(),
      password: joi.string().required(),
      email: joi.string().required(),
      phone: joi.string().optional()
    }),
    handler: (req, res) => {
      return getUser(req.body.username)
        .then(async (user) => {
          if (user) {
            res.status(400).json('Username already exists')
            return
          }

          try {
            const salt = await bcrypt.genSalt()
            const password = await bcrypt.hash(req.body.password, salt)

            const newUser = {
              ...req.body,
              password,
              salt
            }

            db.save(newUser, 'User', async (err: Error, result: UserModel) => {
              if (err) {
                return res.status(500).send()
              }

              return res.json(await createResponse(result))
            })
          } catch (err) {
            res.status(500)
          }
        })
        .catch((err) => { console.log(err); res.status(500).send() })
    }
  }
]
