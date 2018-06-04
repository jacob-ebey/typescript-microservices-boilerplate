import * as React from 'react'
import { RouteConfig } from 'react-router-config'
import * as Loadable from 'react-loadable'

import { App } from './components/App'

const Loading = () => (<div>Loading...</div>)

// TODO: Get webpack code splitting working for async imports
const User = Loadable({
  loader: () => import('./components/User'),
  loading: Loading,
  render (loaded, props) {
    let Component = loaded.User
    return <Component {...props}/>
  }
})

export const routes: RouteConfig[] = [
  {
    component: App,
    routes: [
      {
        path: '/user',
        component: User
      }
    ]
  }
]
