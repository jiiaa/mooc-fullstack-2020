// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

import serverService from '../services/serverService';

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data.sort((a, b) => b.votes - a.votes);;
    case 'ADD_ANECDOTE':
      const newAnecdote = action.newAnecdote;
      return state.concat(newAnecdote);
      // return [...state, actionnewAnecdote];
    case 'VOTE_ANECDOTE':
      const anecdoteVoted = action.anecdote;
      const id = anecdoteVoted.id;
      const unsortedAnecdotes = state.map(item =>
        item.id !== id ? item : anecdoteVoted
      )
      return unsortedAnecdotes.sort((a, b) => b.votes - a.votes);
      // return state.map(item =>
      //   item.id !== id ? item : anecdoteVoted
      // ).sort((a, b) => b.votes - a.votes);
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await serverService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  };
};

export const addAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await serverService.addNew(anecdote);
    dispatch({
      type: 'ADD_ANECDOTE',
      newAnecdote
    })
  };
};

export const voteAnecdote = anecdote => {
  return async dispatch => {
    await serverService.addVote(anecdote);
    dispatch({
      type: 'VOTE_ANECDOTE',
      anecdote
    })
  };
};

export default anecdoteReducer;
