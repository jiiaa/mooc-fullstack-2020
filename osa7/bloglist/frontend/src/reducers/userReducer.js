import userService from '../services/login';

const userReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_USER':
      return action.user;
    default:
      return state;
  }
}

export const setUserState = (user) => (
  {
    type: 'SET_USER',
    user
  }
);

export const loginUser = (user) => {
  return async dispatch => {
    const loggedUser = await userService.login(user);
    dispatch({
      type: 'SET_USER',
      user: loggedUser
    })
  };
};

export default userReducer;