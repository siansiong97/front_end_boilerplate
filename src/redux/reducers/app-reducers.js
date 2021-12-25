import localStorage from "local-storage";
import { get, isEqual, set } from "lodash";
import { TRIGGER_MODAL, UPDATE_GLOBAL_MODAL_VISIBLE } from "../actions/app-actions";
import { persistRedux } from "../config";

const INITIAL_STATE = {
  modalVisible: false,
  modalType: '',
  modalRedirection: '',
}
export default function (state = INITIAL_STATE, action) {

  let persistStates = get(localStorage.get('redux') || {}, 'app') || INITIAL_STATE;
  let newState = {
    ...state,
    ...persistStates
  }

  if (!isEqual(state, newState)) {
    state = newState;
  }

  switch (action.type) {
    case UPDATE_GLOBAL_MODAL_VISIBLE:
      state = {
        ...state,
        modalVisible: get(action, 'visible') === true,
        modalType: get(action, 'visible') != true ? '' : state.modalType,
        modalRedirection: get(action, 'visible') != true ? '' : state.modalRedirection,
      }
      break;
    case TRIGGER_MODAL:
      state = {
        ...state,
        modalVisible: true,
        modalType: get(action, 'payload.type'),
        modalRedirection: get(action, 'payload.redirection'),
      }
      break;
    default:
      break;
  }

  persistRedux('app', state);
  return state;
}
