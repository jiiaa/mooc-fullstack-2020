import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationReducer from './reducers/notificationReducer';
import blogsReducer from './reducers/blogsReducer';
import loginReducer from './reducers/loginReducer';
import usersReducer from './reducers/usersReducer';

const reducer = combineReducers({
  user: loginReducer,
  allUsers: usersReducer,
  blogs: blogsReducer,
  notification: notificationReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;