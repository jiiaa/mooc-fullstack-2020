import React from 'react';

import Content from './Content';
import Header from './Header';
import Total from './Total';

import { courseParts } from './data';

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;
