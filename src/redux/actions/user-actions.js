export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const LOGOUT_SUCCESSFUL = 'LOGOUT_SUCCESSFUL';

export function loginSuccessful(user, accessKey) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_SUCCESSFUL,
      user,
      accessKey,
    });
  }
}

export function logoutSuccessful() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_SUCCESSFUL,
    });
  }
}
