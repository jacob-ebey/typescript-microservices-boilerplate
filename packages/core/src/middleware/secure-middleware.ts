import * as jwt from 'express-jwt'

export function secure () {
  return jwt({ secret: process.env.JWT_SECRET || '' })
}
