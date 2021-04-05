import React from 'react';
import Part from './Part';
import { CoursePart } from './Types';

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
  return <>{courseParts.map(course =>
      <Part key={course.name} course={course} />
    )}
  </>;
};

export default Content;