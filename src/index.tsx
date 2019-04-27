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
import { routerMiddleware, ConnectedRouter } from 'connected-react-router'

// Utils
import { get } from 'lodash'

// Main Theme
import { ThemeProvider, createGlobalStyle } from 'styled-components'

// Style Imports
import NormalizeStyles from './styles/normalize'
import GlobalStyles from './styles/globals'

// Router
import { createBrowserHistory } from 'history'

// ----------------------------------------------------------------------------
// App files
import { reducer } from './reducer'
import { Router } from './router'
import theme from './styles'

// ----------------------------------------------------------------------------
// Hot reducer helper
const hotReducer = replaceReducer => replaceReducer('./reducer', reducer)

// ----------------------------------------------------------------------------
// Bootstrap

// Create history
const history = createBrowserHistory()

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
const configureStore = () => {
  const store = createStore(reducer(history), composeEnhancers(middleware))

  const replaceReducer = (location, reducer) => {
    module.hot.accept(location, () => {
      store.replaceReducer(reducer(history))
    })
  }

  if (module.hot) {
    hotReducer(replaceReducer)
  }

  return store
}

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history} key={Math.random()}>
      <ThemeProvider theme={theme}>
        <Fragment>
          <Styles />
          <Router key="router" />
        </Fragment>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('app'))
