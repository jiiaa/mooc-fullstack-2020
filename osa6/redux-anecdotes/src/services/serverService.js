import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const addNew = async (anecdote) => {
  const res = await axios.post(baseUrl, anecdote)
  return res.data;
}

const addVote = async (anecdote) => {
  const id = anecdote.id;
  const res = await axios.put(`${baseUrl}/${id}`, anecdote);
  return res;
}

export default { getAll, addNew, addVote };