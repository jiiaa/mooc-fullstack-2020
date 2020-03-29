import React from 'react';
import Person from './Person';

const FilteredList = ({ showList }) => (
    <div>
        {showList.map(person => (
            <Person key={person.name} person={person} />
        ))
        }
    </div>
)

export default FilteredList;