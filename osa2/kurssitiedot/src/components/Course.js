import React from 'react';

const Header = props => (
    <>
        <h2>{props.name}</h2>
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

const Total = ({ parts }) => {
    let total = parts.reduce((s, p) => s + p.exercises, 0);
    return (
        <>
            <p><strong>Number of exercises {total}</strong></p>
        </>
    )
}

const Course = ({ courses }) => {
    return (
        courses.map(course => (
            <div>
                <Header name={course.name} />
                <Content parts={course.parts} />
                <Total parts={course.parts} />
            </div>
        )
        )
    )
}

export default Course;