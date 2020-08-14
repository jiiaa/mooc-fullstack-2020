const initialState = '';
let timeOut = '';

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      const addNotification = action.content;
      return addNotification;
    default:
      return state
    }
};

export const setNotification = (content, time) => {
  const timeMs = time * 1000;
  return async dispatch => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      content
    });
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = await setTimeout(() => {
      dispatch({
        type: 'ADD_NOTIFICATION',
        content: ''
      });
    }, timeMs);
  }
}

 export default notificationReducer;
