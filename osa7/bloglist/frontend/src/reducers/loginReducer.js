import userService from '../services/user';
import blogService from '../services/blogs';

const loginReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_USER':
      return action.user;
    default:
      return state;
  }
}

export const setUserState = (user) => {
  blogService.setToken(user.token);
  return {
      type: 'SET_USER',
      user
  }
};

export const loginUser = (user) => {
  return async dispatch => {
    const loggedUser = await userService.login(user);
    window.localStorage.setItem('loggedInUser', JSON.stringify(loggedUser));
    blogService.setToken(loggedUser.token);
    dispatch({
      type: 'SET_USER',
      user: loggedUser
    })
    return loggedUser;
  };
};

export const logoutUser = () => {
  window.localStorage.removeItem('loggedInUser');
  return {
    type: 'SET_USER',
    user: null
  }
};

export default loginReducer;