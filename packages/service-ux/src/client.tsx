import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import { routes } from './clientRoutes'

const container = document.getElementById('container')

ReactDOM.hydrate((
  <BrowserRouter>
    {renderRoutes(routes)}
  </BrowserRouter>
), container)
