import * as path from 'path'
import * as joi from 'joi'
const dotenv = require('dotenv')

export const endpoints = process.env.NODE_ENV === 'development'
  ? {
    auth: 'http://localhost:3001/',
    ux: 'http://localhost:3000/'
  } : {
    auth: 'https://gh-service-auth.herokuapp.com/',
    ux: 'https://growhub.herokuapp.com/'
  }

export const whitelist: Set<string | undefined> = process.env.NODE_ENV === 'development'
  ? new Set([
    undefined,
    'http://localhost:3000',
    'http://localhost:3001'
  ])
  : new Set([
    'https://gh-service-auth.herokuapp.com/'
  ])

export function globalConfig () {
  dotenv.config({
    path: path.join(process.cwd(), '../../.env')
  })
  dotenv.config()

  const validation = joi.object().keys({
    PORT: joi.number().required(),
    JWT_SECRET: joi.string().required()
  }).unknown().required().validate(process.env)

  if (validation.error) {
    throw new Error('Environment variables invalid:\n\t' + validation.error.message)
  }
}
