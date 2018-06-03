import { AddressInfo, Server } from 'net'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as jwt from 'express-jwt'
import * as helmet from 'helmet'
import { ObjectSchema } from 'joi'

import { whitelist } from './globalConfig'

export type RequestHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => any

export interface ExpressMiddleware {
  path: string
  handler: RequestHandler | RequestHandler[]
  method?: 'delete' | 'get' | 'post' | 'put'
  bodySchema?: ObjectSchema
  disableCors?: boolean
  auth?: boolean
}

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.has(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

export function expressApp (middlewares?: ExpressMiddleware[]): express.Express {
  const app: express.Express = express()

  app.use(helmet())

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  if (middlewares) {
    middlewares.forEach((middleware: ExpressMiddleware) => {

      if (!middleware.disableCors) {
        app.use(middleware.path, cors(corsOptions))
      }

      if (middleware.auth) {
        app.use(middleware.path, jwt({ secret: process.env.JWT_SECRET || '' }))
      }

      if (middleware.bodySchema) {
        app.use(middleware.path, (req, res, next) => {
          const valid = (middleware.bodySchema as ObjectSchema).validate(req.body)
          if (valid.error) {
            res.status(400).json(valid.error.details)
            return next(valid.error)
          }

          return next()
        })
      }

      if (middleware.method) {
        app[middleware.method](middleware.path, middleware.handler)
      } else {
        app.use(middleware.path, middleware.handler)
      }
    })
  }

  return app
}

export function gracefulShutdown (serviceName: string, app: express.Express, cleanup?: () => any | Promise<any>) {
  console.info(`Starting ${serviceName} Service...`)

  const server: Server = app.listen(process.env.PORT, () => {
    const address: AddressInfo | string = server.address()

    const startedOn = typeof address === 'string'
      ? address :
      `${address.family || ''} ${address.address === '::' ? 'localhost' : address.address || 'port'}::${address.port}`

    console.info(`Started ${serviceName} Service on: ${startedOn}`)
  })

  const cleanupCallback = () => {
    console.warn(`Shutting down ${serviceName}...`)

    server.close(function () {
      Promise
        .resolve(cleanup && cleanup())
        .then(() => {
          console.warn(`Shutdown ${serviceName}`)
          process.exit(0)
        })
    })
  }

  process.on('SIGINT', cleanupCallback)
}
