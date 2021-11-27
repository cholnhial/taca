import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import joinRoomReducer from './store/reducers/joinRoom'
import chatRoomReducer from './store/reducers/chatRoom'
import './index.css'
import thunk from 'redux-thunk'
import App from './App'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    joinRoom: joinRoomReducer,
    chatRoom: chatRoomReducer
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
