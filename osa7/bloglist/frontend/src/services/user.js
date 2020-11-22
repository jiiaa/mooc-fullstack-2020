import axios from 'axios';

const baseUrl = '/api/users';

const getAllUsers = async () => {
  const url = `${baseUrl}/getall`;
  const response = await axios.get(url);
  return response.data;
}

const login = async credentials => {
  const url = `${baseUrl}/login`;
  const response = await axios.post(url, credentials);
  return response.data;
};

export default { getAllUsers, login };
