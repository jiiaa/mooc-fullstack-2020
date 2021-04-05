import React from 'react';

interface Part{
  name: string,
  exerciseCount: number
}

type Courses = Part[];

const Content = ({courseParts}: {courseParts: Courses}) => {
  return <>{courseParts.map(course =>
      <p key={course.name}>
        {course.name}: {course.exerciseCount} exercises
      </p>
    )}
  </>;
};

export default Content;