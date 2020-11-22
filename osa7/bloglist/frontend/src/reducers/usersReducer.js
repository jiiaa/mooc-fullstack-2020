import userService from '../services/user';

const usersReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_USERS':
      return action.allUsers;
    default:
      return state;
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    const allUsers = await userService.getAllUsers();
    dispatch({
      type: 'SET_USERS',
      allUsers
    })
  };
};

export default usersReducer;