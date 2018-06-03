import * as React from 'react'
import * as ReactDOM from 'react-dom/server'
import reactHelmet from 'react-helmet'

import { ExpressMiddleware } from '@packages/core'

import { Html } from './Html'
import { App } from './components/App'

export const routes: ExpressMiddleware[] = [
  {
    method: 'get',
    path: '/',
    disableCors: true,
    handler: (_, res) => {
      const app = ReactDOM.renderToString(<App />)
      const helmet = reactHelmet.renderStatic()

      const html = ReactDOM.renderToStaticMarkup(<Html helmet={helmet} app={app} />)

      res.contentType('text/html').send(html)
    }
  }
]
