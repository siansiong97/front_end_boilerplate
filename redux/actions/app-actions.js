export const UPDATE_ACTIVE_MENU_KEY = 'update_active_menu_key';

export const SET_INITED_REDUX = 'SET_INITED_REDUX';

export function updateActiveMenuKey(payload){
  return (dispatch) => {
    dispatch({
      type: UPDATE_ACTIVE_MENU_KEY,
      payload
    });
  }
}

export function setInitedRedux(data){
  return (dispatch) => {
    dispatch({
      type: SET_INITED_REDUX,
      data,
    })
  }
}