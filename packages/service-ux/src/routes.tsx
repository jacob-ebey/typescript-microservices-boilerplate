import * as path from 'path'
import * as express from 'express'
import * as React from 'react'
import * as ReactDOM from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter'
import { renderRoutes } from 'react-router-config'
import reactHelmet from 'react-helmet'

import { ExpressMiddleware } from '@packages/core'

import { Html } from './Html'
import { routes as clientRoutes } from './clientRoutes'

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
    handler: (req, res, next) => {
      if (req.url === '/playground') {
        return next()
      }

      // const branch = matchRoutes(clientRoutes, req.url)

      const app = ReactDOM.renderToString(
        <StaticRouter location={req.url} context={{}}>
          {renderRoutes(clientRoutes)}
        </StaticRouter>
      )

      const helmet = reactHelmet.renderStatic()

      const html = ReactDOM.renderToStaticMarkup(<Html helmet={helmet} app={app} />)

      res.contentType('text/html').send(html)
    }
  }
]
