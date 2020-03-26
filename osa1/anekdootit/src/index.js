import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, handleClick }) => (
  <span>
    <button onClick={handleClick}>{text}</button>
  </span>
);

const App = (props) => {
  const points = Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0);
  const [selected, setSelected] = useState();
  const [votes, setVotes] = useState(points);
  const [mostVoted, setMostVoted] = useState();

  const clickNext = () => {
    const random = Math.round(Math.random() * 9);
    setSelected(random);
  }

  const clickVote = () => {
    const points = [...votes];
    points[selected] += 1;
    const mostWanted = points.indexOf(Math.max(...points));
    setVotes(points);
    setMostVoted(mostWanted);
  }

  return (
    <div>
      <h2>Anecdote of The Day</h2>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        ...has {votes[selected]} votes
      </div>
      <Button text="Vote" handleClick={clickVote} />
      <Button text="Next Anecdote" handleClick={clickNext} />
      <h2>Most Voted Anecdote</h2>
      <div>{props.anecdotes[mostVoted]}</div>
      <div>has {votes[mostVoted]} votes.</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later.',
  'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Premature optimization is the root of all evil.',
  'Debuggin is twice as hard as writing the code in the first place. Therefore, if  you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'The best way to get a project done faster is to start sooner.',
  'How does a project get to be a year late? ... One day at a time.',
  'Real programmers can write assembly code in any language.',
  'Why do we never have time to do it right, but always have time to do it over?',
  ' If you think good architecture is expensive, try bad architecture.'

]
ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
