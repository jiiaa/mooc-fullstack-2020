import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();

  const handleAdd = async (e) => {
    e.preventDefault();
    const anecdote = { content: e.target.anecdote.value, votes: 0 };
    e.target.anecdote.value = '';
    props.addAnecdote(anecdote);
    props.setNotification(`You added an anecdote and I quote "${anecdote.content}"`, 3);
  }

  return (
    <>
      <h2>Add a new anecdote</h2>
      <form onSubmit={handleAdd}>
        <div><input name="anecdote" /></div>
        <button>A d d</button>
      </form>
    </>
  )
}

// export default AnecdoteForm;
export default connect(
  null,
  { addAnecdote, setNotification }
)(AnecdoteForm);
