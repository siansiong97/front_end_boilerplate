import { combineReducers } from 'redux';
import AppReducer from './app-reducer';
const reducers = {
  app: AppReducer,
}

export const rootReducer = combineReducers(reducers);

