import { combineReducers } from 'redux';
import userReducer from './user-reducers';



export const reducers = {
    user : userReducer,
}

const rootReducer = combineReducers(reducers);

export default rootReducer;


