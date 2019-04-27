import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import test from './test'

export const reducer = history =>
  combineReducers({ router: connectRouter(history), test })
