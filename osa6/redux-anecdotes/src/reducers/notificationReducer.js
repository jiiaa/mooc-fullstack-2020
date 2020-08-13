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
  clearTimeout(timeOut);
  return async dispatch => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      content
    });
    timeOut = await setTimeout(() => {
      dispatch({
        type: 'ADD_NOTIFICATION',
        content: ''
      });
    }, timeMs);
  }
}

 export default notificationReducer;
