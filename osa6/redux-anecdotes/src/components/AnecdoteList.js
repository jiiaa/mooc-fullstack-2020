import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

// let timeoutId = '';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state.anecdotes);
  const filter = useSelector(state => state.filter);

  // const anecdotes = useSelector(state => {
  //   const filter = state.filter.toLowerCase();
  //   return state.anecdotes.filter(a => a.content.toLowerCase().includes(filter));
  // });

  const vote = id => {
    const votedAnecdote = anecdotes.find(a => a.id === id);
    const anecdote = {...votedAnecdote, votes: votedAnecdote.votes + 1 }
    dispatch(setNotification(`You voted "${anecdote.content}"`, 3));
    dispatch(voteAnecdote(anecdote));
  }

  return (
    <>
      {anecdotes.map(anecdote => {
        return (anecdote.content.includes(filter)
          ?
            <div key={anecdote.id}>
              <div><strong>
                {anecdote.content}
              </strong></div>
              <div>
                has {anecdote.votes} votes, &nbsp;
                <button onClick={() => vote(anecdote.id)}>V o t e</button>
              </div>
            </div>
          :
            null
        )
      })}
    </>
  )
}

export default AnecdoteList;
