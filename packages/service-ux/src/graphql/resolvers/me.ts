// import { UserProfile } from '@packages/core'

import { GraphContext } from '../types'

export const Query = {
  me (_: {}, args: {}, context: GraphContext) {
    console.log(args)
    console.log(context)

    return {
      profile: {
        id: 1,
        username: 'test',
        email: 'test@test.com'
      }
    }
  }
}
