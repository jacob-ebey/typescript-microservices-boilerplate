import { ExpressMiddleware } from '@packages/core'

export const routes: ExpressMiddleware[] = [
  {
    method: 'get',
    path: '/login',
    handler: (_, res) => {
      res.json('Hello, World!')
    }
  }
]
