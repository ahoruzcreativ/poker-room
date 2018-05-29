import {createStore, applyMiddleware, combineReducers} from 'redux'
import logger from 'redux-logger'
import thunks from 'redux-thunk'
import axios from 'axios'
import gameState from './gameState'
import clientPlayer from './clientPlayer'

const reducer = combineReducers({ gameState, clientPlayer })

const store = createStore(
	reducer,
	applyMiddleware(thunks.withExtraArgument({ axios, history }), logger)
)

export default store
