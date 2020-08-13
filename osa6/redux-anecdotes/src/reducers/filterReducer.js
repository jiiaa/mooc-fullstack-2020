const initialState = '';

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      const value = action.data.value;
      return value;
    default:
      return state
  }
};

export const setFilterValue = value => {
  return {
    type: 'SET_FILTER',
    data: {
      value
    }
  }
}

export default filterReducer;