import * as cors from 'cors'
import * as express from 'express'
import * as helmet from 'helmet'

import { whitelist } from './config'

export type RequestHandler = (req: express.Request, res: express.Response, next?: express.NextFunction) => any

export interface ExpressMiddleware {
  path: string
  handler: RequestHandler | RequestHandler[]
  method?: 'delete' | 'get' | 'post' | 'put',
  authenticate?: boolean
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
  app.use(cors(corsOptions))

  if (middlewares) {
    middlewares.forEach((middleware: ExpressMiddleware) => {
      if (middleware.method) {
        if (Array.isArray(middleware.handler)) {
          app[middleware.method](middleware.path, ...middleware.handler)
        } else {
          app[middleware.method](middleware.path, middleware.handler)
        }
      } else {
        if (Array.isArray(middleware.handler)) {
          app.use(middleware.path, ...middleware.handler)
        } else {
          app.use(middleware.path, middleware.handler)
        }
      }
    })
  }

  return app
}
