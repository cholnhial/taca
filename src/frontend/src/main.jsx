import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import joinRoomReducer from './store/reducers/joinRoom'
import './index.css'
import thunk from 'redux-thunk'
import App from './App'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    joinRoom: joinRoomReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));
ReactDOM.render(
    <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
    </Provider>,
  document.getElementById('root')
)
