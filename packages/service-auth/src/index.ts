import * as express from 'express'

import { expressApp, gracefulShutdown, globalConfig } from '@packages/core'

import { config } from './config'

globalConfig()
config()

import { db } from './db'
import { routes } from './routes'

const app: express.Express = expressApp(routes)

gracefulShutdown('Auth', app, () => {
  db.close()
})
