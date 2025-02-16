import axios from 'axios';

const customFetch = axios.create({
  baseURL: `https://quizzo-app.onrender.com/api/v1`,
});

export default customFetch;
