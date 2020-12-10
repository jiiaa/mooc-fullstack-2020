import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useNotes = (url) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get(url).then(response => {
      setNotes(response.data);
    });
  }, [url]);
  return notes;
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  // const url = 'http://localhost:3001/notes';
  // const url = 'https://blooming-atoll-75500.herokuapp.com/api/notes';
  const notes = useNotes(BACKEND_URL);

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };

  return (
    <div className="container">
      <div>Hello Webpack</div>
      <div>You have {counter} clicks</div>
      <button onClick={handleClick}>
        Click
      </button>
      <div>{notes.length} notes on the server {BACKEND_URL}</div>
    </div>
  );
}

export default App