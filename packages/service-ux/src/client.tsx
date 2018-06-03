import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { App } from './components/App'

const container = document.getElementById('container')

ReactDOM.hydrate(<App />, container)
