// Lib Imports
import React from 'react'
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'

// App Container
import Main from '../entries/main'

// ---------------------------------------------------------------------------

const AppRouter = () => (
  <Switch>
    <Route exact path="/" component={Main} />
  </Switch>
)

export default hot(module)(AppRouter)
