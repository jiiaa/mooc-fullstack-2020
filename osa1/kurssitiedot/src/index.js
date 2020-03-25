import React from 'react';
import ReactDOM from 'react-dom';

const Header = props => (
  <>
    <h1>{props.name}</h1>
  </>
)

const Part = props => (
  <>
    <p>
      {props.name} {props.exercises}
    </p>
  </>
)

const Content = props => (
  props.parts.map(item => <Part key={item.name} name={item.name} exercises={item.exercises} />)
)

const Total = props => {
  let total = 0;
  props.parts.forEach(item => total += item.exercises
  )
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'));
