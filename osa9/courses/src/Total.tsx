import React from 'react';

interface Part{
  name: string,
  exerciseCount: number
}

type Courses = Part[];

const Total = ({courses}: {courses: Courses}) => {
  return <p><strong>Number of exercises: {courses.reduce((sum: number, part: Part) => sum + part.exerciseCount, 0)}</strong></p>;
};

export default Total;