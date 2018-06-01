import * as joi from 'joi'
import * as jwt from 'jsonwebtoken'

import { ExpressMiddleware } from '@packages/core'

import { db } from './db'

const loginSchema = joi.object().keys({
  username: joi.string().required(),
  password: joi.string().required()
}).required()

export const routes: ExpressMiddleware[] = [
  {
    method: 'post',
    path: '/login',
    handler: (req, res): void => {
      const valid = loginSchema.validate(req.body)
      if (valid.error) {
        res.status(400).json(valid.error)
        return
      }

      const { username } = req.body

      db.cypher({
        query: 'MATCH (n:User { username: {username} })',
        params: { username }
      }, (error, result) => {
        if (error) {
          res.status(500)
          return
        }

        if (!result) {
          res.status(401)
          return
        }

        jwt.sign({
          id: result.id,
          username: result.username
        }, process.env.JWT_SECRET as string, (err: Error, token: string) => {
          if (err) {
            res.status(500)
            return
          }

          res.json({
            token,
            id: result.id,
            username: result.username,
            roles: result.roles
          })
        })
      })
    }
  }
]
