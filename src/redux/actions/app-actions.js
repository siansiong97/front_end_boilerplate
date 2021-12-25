export const UPDATE_GLOBAL_MODAL_VISIBLE = 'UPDATE_GLOBAL_MODAL_VISIBLE';
export const TRIGGER_MODAL = 'TRIGGER_MODAL';

export function updateGlobalModalVisible(visible) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_GLOBAL_MODAL_VISIBLE,
      visible : visible,
    });
  }
}

export function triggerModal(payload) {
  return (dispatch) => {
    dispatch({
      type: TRIGGER_MODAL,
      payload : payload,
    });
  }
}