import { get, isEqual, set } from "lodash";
import { LOGIN_SUCCESSFUL, LOGOUT_SUCCESSFUL, UPDATE_USER } from "../actions/user-actions";
import { persistRedux } from "../config";
import localStorage from "local-storage";

const INITIAL_STATE = {
    user: {},
    isAuthenticated: false,
    accessKey: '',
}
export default function (state = INITIAL_STATE, action) {

    let persistStates = get(localStorage.get('redux') || {}, 'user') || INITIAL_STATE;
    let newState = {
        ...state,
        ...persistStates
    }

    if (!isEqual(state, newState)) {
        state = newState;
    }

    switch (action.type) {
        case LOGIN_SUCCESSFUL:
            set(state, 'user', get(action, 'user') || INITIAL_STATE.user);
            set(state, 'isAuthenticated', true);
            set(state, 'accessKey', get(action, 'accessKey') || INITIAL_STATE.accessKey);
            break;

        case LOGOUT_SUCCESSFUL:
            set(state, 'user', INITIAL_STATE.user);
            set(state, 'isAuthenticated', false);
            set(state, 'accessKey', INITIAL_STATE.accessKey);
            break;

        case UPDATE_USER:
            state.user = {
                ...state.user,
                ...get(action, 'user')
            }
            break;


        default:
            break;
    }

    persistRedux('user', state);
    return state;
}
