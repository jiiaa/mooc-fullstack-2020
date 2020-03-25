import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ({ text, value, unit }) => (
  <tr>
    <td>{text}</td><td>{value} {unit}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, count }) => {
  if (count !== 0) {
    return (
      <table>
        <tbody>
          <StatisticsLine text="Good" value={good} />
          <StatisticsLine text="Neutral" value={neutral} />
          <StatisticsLine text="Bad" value={bad} />
          <StatisticsLine text="Votes" value={count} />
          <StatisticsLine text="Average" value={((good - bad) / count).toFixed(2)} />
          <StatisticsLine text="Positive" unit="%" value={(good / count * 100).toFixed(2)} />
        </tbody>
      </table>
    )
  }
  return (
    <div>
      No feedback given
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [count, setCount] = useState(0);

  const handleGoodClick = () => {
    setCount(count + 1);
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    setCount(count + 1);
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => {
    setCount(count + 1);
    setBad(bad + 1);
  }

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <h2>Statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        count={count}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

