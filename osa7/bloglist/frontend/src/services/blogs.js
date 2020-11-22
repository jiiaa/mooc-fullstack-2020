import axios from 'axios';

const baseUrl = '/api/blogs';
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addBlog = async newBlog => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const addLikes = async (likedBlog) => {
  const putUrl = `${baseUrl}/${likedBlog.id}`;
  const response = await axios.put(putUrl, likedBlog,);
  return response.data;
};

const addComment = async (id, comment) => {
  const commentUrl = `${baseUrl}/${id}/comments`;
  const newComment = { comment };
  const response = await axios.post(commentUrl, newComment )
  return response.data;
}

const deleteBlog = async id => {
  const delUrl = `${baseUrl}/${id}`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(delUrl, config);
  return response.data;
};

export default {
  setToken,
  getAll,
  addBlog,
  addLikes,
  addComment,
  deleteBlog
};
