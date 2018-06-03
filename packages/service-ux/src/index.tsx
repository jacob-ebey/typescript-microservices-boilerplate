import * as express from 'express'

import { expressApp, gracefulShutdown, globalConfig } from '@packages/core'

globalConfig()

import { routes } from './routes'

const app: express.Express = expressApp(routes)

app.use(express.static('public'))

gracefulShutdown('UX', app)
