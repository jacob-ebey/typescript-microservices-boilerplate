import * as React from 'react'
import { Helmet } from 'react-helmet'
import { renderRoutes } from 'react-router-config'

import { Header } from './Header'

export class App extends React.Component<any> {
  public static ssr: boolean = false

  public render () {
    return (
      <div className='App'>
        <Helmet>
          <title>Home Page</title>
        </Helmet>
        <Header />

        {this.props.route && renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}
