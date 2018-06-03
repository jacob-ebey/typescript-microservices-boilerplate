require('es6-promise').polyfill()
require('isomorphic-fetch')
import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import { routes } from './clientRoutes'

const container = document.getElementById('container')

const client = new (ApolloClient as any)({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__)
})

ReactDOM.hydrate((
  <ApolloProvider client={client}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </ApolloProvider>
), container)
