import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import AddForm from './components/AddForm';
import Filter from './components/Filter';
import FilteredList from './components/FilteredList';

import './index.css';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Aku Ankka', number: '131' },
    { name: 'Iines Ankka', number: '131-232' },
    { name: 'Roope Ankka', number: '$$$$' },
    { name: 'Mary Poppins', number: '123 456' },
    { name: 'Mary McDowel', number: '040-050' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showList, setShowList] = useState([]);

  const handleNameChange = e => {
    setNewName(e.target.value);
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  }

  const handleFilter = e => {
    const filter = e.target.value;
    let list = [];
    if (filter) {
      list = persons.filter(p => (
        p.name.toLowerCase().includes(filter.toLowerCase())
      ))
    }
    setShowList(list);
  }

  const addName = e => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const match = persons.find(person => (
      person.name === newPerson.name
    ))
    if (match) {
      alert(`${match.name} was already added to the phonebook`)
    } else {
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onchange={handleFilter} />
      <h3>Add A New Name</h3>
      <AddForm
        onsubmit={addName}
        handleName={handleNameChange}
        handleNumber={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Filtered Numbers</h3>
      <FilteredList showList={showList}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
