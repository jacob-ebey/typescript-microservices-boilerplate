import * as React from 'react'
import { Helmet } from 'react-helmet'
import { renderRoutes } from 'react-router-config'

export class App extends React.Component<any> {
  public static ssr: boolean = false

  public render () {
    return (
      <div>
        <Helmet>
          <title>Home Page</title>
        </Helmet>
        <div>Hello, World!</div>
        <button onClick={() => console.log('clicked')}>Click Me</button>

        {this.props.route && renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}
