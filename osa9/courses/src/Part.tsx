import React from 'react';
import { CoursePart } from './Types';

const Part = ({course}: {course: CoursePart}) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (course.type) {
    case "normal":
      return <p>
      <div><strong>{course.name}: {course.exerciseCount} exercises</strong></div>
      <div><i>{course.description}</i></div>
      </p>;
    case "groupProject":
      return <p>
      <div><strong>{course.name}: {course.exerciseCount} exercises</strong></div>
      <div>Project exercises: {course.groupProjectCount}</div>
      </p>;
    case "submission":
      return <p>
      <div><strong>{course.name}: {course.exerciseCount} exercises</strong></div>
      <div><i>{course.description}</i></div>
      <div>Submit to {course.exerciseSubmissionLink}</div>
      </p>;
    case "special":
      return <p>
      <div><strong>{course.name}: {course.exerciseCount} exercises</strong></div>
      <div><i>{course.description}</i></div>
      <div>Required skills: {course.requirements.map(r =>
        <span key={r}>{r}, </span>
      )}</div>
      </p>;
    default:
      return assertNever(course);
  }
};

export default Part;