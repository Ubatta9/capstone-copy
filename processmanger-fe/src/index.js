import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import editors from './modules/editors'
import followers from'./modules/followers'
import {Provider} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
const handleAsync = storeAPI => next => action => {
    if (typeof action === 'function')
        return action(storeAPI.dispatch, storeAPI.getState)

    next(action)
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({editors,followers}),
    composeEnhancers(applyMiddleware(handleAsync))
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>
);

