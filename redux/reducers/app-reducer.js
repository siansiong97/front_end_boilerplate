import _ from 'lodash';
import { UPDATE_ACTIVE_MENU_KEY, SET_INITED_REDUX, } from '../actions/app-actions';
import localStorage from 'local-storage';
import { persistRedux } from '../config';

const INITIAL_STATE = {
  activeMenuKey: 0,
  initedRedux: {},
}


export default function (state = INITIAL_STATE, action) {

  let persistStates = _.get(localStorage.get('redux') || {}, 'app') || INITIAL_STATE;
  let newState = {
    ...state,
    ...persistStates
  }

  if (!_.isEqual(state, newState)) {
    state = newState;
  }

  switch (action.type) {
    case UPDATE_ACTIVE_MENU_KEY:
      state = {
        ...state,
        activeMenuKey: action.payload,
      }
      break;
    case SET_INITED_REDUX:
      state = {
        ...state,
        initedRedux: action.data
      };
      break;
    default:

  }

  persistRedux('app', state)
  return state;
}
