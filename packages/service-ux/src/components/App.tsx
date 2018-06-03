import * as React from 'react'
import { Helmet } from 'react-helmet'

export class App extends React.Component {
  public render () {
    return (
      <React.Fragment>
        <Helmet>
          <title>Home Page</title>
        </Helmet>
        <div>Hello, World!</div>
      </React.Fragment>
    )
  }
}
