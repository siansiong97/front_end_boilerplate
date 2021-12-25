import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const bindMiddleware = (middleware) => {
  return applyMiddleware(...middleware)
}

const store = createStore(rootReducer, bindMiddleware([thunkMiddleware]));


export default ({ element, props }) => (
  <Provider store={store} {...props}>{element}</Provider>
);