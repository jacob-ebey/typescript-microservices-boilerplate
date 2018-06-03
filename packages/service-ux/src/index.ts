require('es6-promise').polyfill()
require('isomorphic-fetch')
import * as express from 'express'
import * as jwt from 'express-jwt'
import { GraphQLServer } from 'graphql-yoga'

import { expressApp, globalConfig } from '@packages/core'

globalConfig()

import { App } from './components/App'

App.ssr = true

import { routes } from './routes'

import resolvers from './graphql/resolvers'
import typeDefs from './graphql/schemas'

const app: express.Express = expressApp(routes)

const graphqlServer = new GraphQLServer({
  typeDefs,
  resolvers
})

graphqlServer.use(app)
graphqlServer.use('/graphql', jwt({
  secret: process.env.JWT_SECRET || '',
  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      return req.headers.authorization.split(' ')[1]
    }

    return null
  }
}))

graphqlServer.start(
  {
    endpoint: '/graphql',
    subscriptions: '/subscriptions',
    playground: '/playground',
    port: process.env.PORT
  },
  (options) => {
    console.info(`Started UX Service on port: ${options.port}`)
  })
