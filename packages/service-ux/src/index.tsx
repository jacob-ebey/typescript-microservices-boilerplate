import * as path from 'path'
import * as express from 'express'

import { expressApp, gracefulShutdown, globalConfig } from '@packages/core'

globalConfig()

import { routes } from './routes'

const app: express.Express = expressApp(routes)

console.log(process.cwd())
app.use(express.static(path.join(process.cwd(), 'public')))

gracefulShutdown('UX', app)
