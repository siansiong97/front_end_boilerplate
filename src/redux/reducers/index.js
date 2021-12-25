import { combineReducers } from 'redux';
import appReducers from './app-reducers';
import userReducer from './user-reducers';

export const reducers = {
    user : userReducer,
    app : appReducers,
}

const rootReducer = combineReducers(reducers);

export default rootReducer;


