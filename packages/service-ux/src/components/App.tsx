import * as React from 'react'
import { Helmet } from 'react-helmet'
import { renderRoutes } from 'react-router-config'

export class App extends React.Component<any> {
  public static ssr: boolean = false

  public render () {
    return (
      <React.Fragment>
        <Helmet>
          <title>Home Page</title>
        </Helmet>
        <div>Hello, World!</div>

        {this.props.route && renderRoutes(this.props.route.routes)}
      </React.Fragment>
    )
  }
}
