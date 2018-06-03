import * as React from 'react'
import { Query } from 'react-apollo'
import { Helmet } from 'react-helmet'

import meQuery from '../queries/meQuery'

export class App extends React.Component {
  public static ssr: boolean = false

  public render () {
    return (
      <React.Fragment>
        <Helmet>
          <title>Home Page</title>
        </Helmet>
        <div>Hello, World!</div>
        <Query
          query={meQuery}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :(</p>

            return <pre><code>{JSON.stringify(data)}</code></pre>
          }}
        </Query>
      </React.Fragment>
    )
  }
}
