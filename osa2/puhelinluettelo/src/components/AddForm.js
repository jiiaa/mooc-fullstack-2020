import React from 'react';

const AddForm = ({ onsubmit, handleName, handleNumber, newName, newNumber}) => (
    <div>
        <form onSubmit={onsubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input id="name" onChange={handleName} value={newName} placeholder='Enter name' />
                <label htmlFor="number">Phone: </label>
                <input id="number" onChange={handleNumber} value={newNumber} placeholder='Enter phone number' />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    </div>
)

export default AddForm;