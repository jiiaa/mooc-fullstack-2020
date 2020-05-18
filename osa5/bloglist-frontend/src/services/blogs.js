import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const addBlog = async newBlog => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const addLikes = async (likedBlog, id) => {
  const putUrl = `${baseUrl}/${id}`;
  const response = await axios.put(putUrl, likedBlog,);
  return response.data;
};

const deleteBlog = async id => {
  const delUrl = `${baseUrl}/${id}`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(delUrl, config);
  return response;
};

export default {
  setToken,
  getAll,
  addBlog,
  addLikes,
  deleteBlog
};
