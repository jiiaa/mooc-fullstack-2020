import React from 'react';
import Person from './Person';

const FilteredList = ({ showList, handleDelete }) => (
    <div>
        {showList.map(person => (
            <Person key={person.name} person={person} handleDelete={handleDelete} />
        ))
        }
    </div>
)

export default FilteredList;