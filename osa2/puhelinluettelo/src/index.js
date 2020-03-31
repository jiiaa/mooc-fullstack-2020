import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import serverService from './services/service';

import AddForm from './components/AddForm';
import Filter from './components/Filter';
import FilteredList from './components/FilteredList';
import Notification from './components/Notification';

import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showList, setShowList] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    serverService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, []);

  const handleNameChange = e => (
    setNewName(e.target.value)
  )

  const handleNumberChange = e => (
    setNewNumber(e.target.value)
  )

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
    };
    const match = persons.find(person => (
      person.name.toLowerCase() === newPerson.name.toLowerCase()
    ))
    if (match) {
      if (window.confirm(`${match.name} was already added to the phonebook. Do you want to replace the old phone number with the new one?`)) {
        const changedNumber = { ...match, number: newNumber };
        serverService
          .updateName(changedNumber)
          .then(response => {
            setPersons(persons.map(p => p.id !== response.id ? p : response));
            setMessage(
              `Phone number of ${response.name} was successfully changed.`
            );
            setTimeout(() => {
              setMessage(null)
            }, 3000);
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.log('update Number:', error);
            setMessage(
              `${match.name} was not found.`
            );
            setTimeout(() => {
              setMessage(null)
            }, 3000);
            serverService
              .getAll()
              .then(response => {
                setPersons(response)
              });
            setNewName('');
            setNewNumber('');
          })
      }
    } else {
      serverService
        .addNew(newPerson)
        .then(response => {
          setPersons(persons.concat(response));
          setMessage(
            `${response.name} was successfully added.`
          );
          setTimeout(() => {
            setMessage(null)
          }, 3000);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.log('addName error:', error);
          setNewName('');
          setNewNumber('');

        })
    }
  }

  const deleteName = id => {
    const target = persons.filter(p => p.id === id);
    if (window.confirm(`Delete ${target[0].name}?`)) {
      serverService
        .delName(id)
        .then(response => {
          serverService
            .getAll()
            .then(response => {
              setPersons(response)
              setMessage(
                `${target[0].name} was successfully deleted.`
              );
              setTimeout(() => {
                setMessage(null)
              }, 3000);
            })
        })
        .catch(error => {
          console.log('delNames error:', error);
          setMessage(
            `${target.name} was not found.`
          );
          setTimeout(() => {
            setMessage(null)
          }, 3000);
          serverService
            .getAll()
            .then(response => {
              setPersons(response)
            })
          setNewName('');
          setNewNumber('');

        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <FilteredList showList={showList} handleDelete={deleteName} />
      <h3>All Numbers</h3>
      <FilteredList showList={persons} handleDelete={deleteName} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
