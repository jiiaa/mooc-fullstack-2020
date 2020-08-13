import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilterValue } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = e => {
    const filterValue = e.target.value;
    dispatch(setFilterValue(filterValue));
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter;
