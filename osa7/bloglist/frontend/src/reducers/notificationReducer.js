const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      const addNotification = action.content;
      return addNotification;
    case 'RESET_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

let timeOut;

export const setNotification = (content, time) => {
  const timeMs = time * 1000;
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content
    });
    if (timeOut) {
      clearTimeout(timeOut);
    };
    timeOut = setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      });
    }, timeMs)
  }
}

export const resetNotification = () => (
  { type: 'RESET_NOTIFICATION' }
)

  export default notificationReducer;