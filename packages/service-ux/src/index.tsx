import * as express from 'express'
import { GraphQLServer } from 'graphql-yoga'

import { expressApp, globalConfig } from '@packages/core'

globalConfig()

import { routes } from './routes'

import resolvers from './graphql/resolvers'
import typeDefs from './graphql/schemas'

const app: express.Express = expressApp(routes)

const graphqlServer = new GraphQLServer({
  typeDefs,
  resolvers
})

graphqlServer.express.use(app)

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
