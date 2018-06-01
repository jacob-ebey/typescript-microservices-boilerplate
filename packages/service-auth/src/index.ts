import * as express from 'express'

import { expressApp, globalConfig } from '@packages/core'

import { config } from './config'

globalConfig()
config()

import { routes } from './routes'

console.log('Starting Service...')

const app: express.Express = expressApp(routes)

app.listen(process.env.PORT, () => {
  console.log(`Started Service on port: ${process.env.PORT}`)
})
