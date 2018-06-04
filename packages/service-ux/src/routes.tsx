import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import * as React from 'react'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import * as ReactDOM from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter'
import { renderRoutes } from 'react-router-config'
import reactHelmet from 'react-helmet'

import { ExpressMiddleware, endpoints } from '@packages/core'

import { Html } from './Html'
import { routes as clientRoutes } from './clientRoutes'

const normalize = fs.readFileSync(path.join(process.cwd(), 'public', 'normalize.css')).toString()
const css = fs.readFileSync(path.join(process.cwd(), 'public', 'css', 'main.css')).toString()

export const routes: ExpressMiddleware[] = [
  {
    path: '/favicon.ico',
    disableCors: true,
    handler: express.static(path.join(process.cwd(), 'public', 'favicon.ico'))
  },
  {
    path: '/static',
    disableCors: true,
    handler: express.static(path.join(process.cwd(), 'public'))
  },
  {
    method: 'get',
    path: '*',
    disableCors: true,
    queryAuth: true,
    handler: (req, res, next) => {
      if (req.url === '/playground') {
        return next()
      }

      // console.log((req as any).token)
      // console.log(req.user)

      // const branch = matchRoutes(clientRoutes, req.url)

      const client = new (ApolloClient as any)({
        link: new HttpLink({ uri: `${endpoints.ux}graphql`, headers: { authorization: `JWT ${(req as any).token}` } }),
        cache: new InMemoryCache(),
        ssrMode: true
      })

      const app = (
        <ApolloProvider client={client}>
          <StaticRouter location={req.url} context={{}}>
            {renderRoutes(clientRoutes)}
          </StaticRouter>
        </ApolloProvider>
      )

      getDataFromTree(app)
        .then(() => {
          const helmet = reactHelmet.renderStatic()
          const graphqlState = client.extract()

          const appString = ReactDOM.renderToString(app)

          const html = ReactDOM.renderToStaticMarkup(
            <Html
              helmet={helmet}
              app={appString}
              graphqlState={graphqlState}
              css={css}
              normalize={normalize}
            />
          )

          res.contentType('text/html').send(`<!DOCTYPE html>${html}`)
        })
        .catch((err) => {
          if (err.networkError && err.networkError.statusCode === 401) {
            res.redirect('/login')
          }

          res.status(500).send()
        })
    }
  }
]
