// Libs
// React
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

// Redux
import { createStore, applyMiddleware, compose } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

// Router
import {
  connectRouter,
  routerMiddleware,
  ConnectedRouter,
} from 'connected-react-router'

// Utils
import { get } from 'lodash'

// Main Theme
import { ThemeProvider, createGlobalStyle } from 'styled-components'

// Style Imports
import NormalizeStyles from './styles/normalize'
import GlobalStyles from './styles/globals'

// Styled components
import { css } from 'styled-components'

// Router
import createHistory from 'history/createBrowserHistory'

// ----------------------------------------------------------------------------
// App files
import reducer from './reducer'
import Router from './router'
import theme from './styles'

// ----------------------------------------------------------------------------
// Hot reducer helper
const hotReducer = replaceReducer => replaceReducer('./reducer', reducer)

// ----------------------------------------------------------------------------
// Bootstrap

// Create history
const history = createHistory()

// Global styles
const Styles = createGlobalStyle`
    ${NormalizeStyles}
    ${GlobalStyles}
  `

const routerReduxMiddleware = routerMiddleware(history)

const middleware = applyMiddleware(
  thunk,
  reduxImmutableStateInvariant(),
  routerReduxMiddleware,
)

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Redux Store for application
const store = createStore(
  connectRouter(history)(reducer),
  composeEnhancers(middleware),
)

const replaceReducer = (location, reducer) => {
  module.hot.accept(location, () => {
    store.replaceReducer(connectRouter(history)(reducer))
  })
}

if (module.hot) {
  hotReducer(replaceReducer)
}

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history} key={Math.random()}>
      <ThemeProvider theme={theme}>
        <Fragment>
          <Styles />
          <Router />
        </Fragment>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('app'))

// ----------------------------------------------------------------------------
