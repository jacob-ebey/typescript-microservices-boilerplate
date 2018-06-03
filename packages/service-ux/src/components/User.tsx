import * as React from 'react'
import { Query } from 'react-apollo'

import meQuery from '../queries/meQuery'

export const User = ({}) => (
  <Query
    query={meQuery}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>

      return <pre><code>{JSON.stringify(data)}</code></pre>
    }}
  </Query>
)
