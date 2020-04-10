import axios from 'axios';

// const baseUrl = 'http://localhost:3001/api/persons';
const baseUrl = '/api/persons';
// const baseUrl = 'https://mooc-osa3.herokuapp.com/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const addNew = newPerson => {
    const request = axios.post(baseUrl, newPerson);
    return request.then(response => response.data);
}

const delName = id => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const updateName = person => {
    const request = axios.put(`${baseUrl}/${person.id}`, person);
    return request.then(response => response.data);
}

export default { getAll, addNew, delName, updateName }
