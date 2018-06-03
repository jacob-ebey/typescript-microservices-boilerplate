import { RouteConfig } from 'react-router-config'

import { App } from './components/App'
import { User } from './components/User'

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
