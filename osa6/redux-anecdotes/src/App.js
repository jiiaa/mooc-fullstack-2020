import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import serverService from './services/serverService';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification);

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      { notification && <Notification />}
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App