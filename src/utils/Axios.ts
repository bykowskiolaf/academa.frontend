import axios from 'axios';

if (import.meta.env.MODE === 'development') {
  axios.defaults.baseURL = 'http://localhost:8080/api';
} else {
  axios.defaults.baseURL = 'https://academa.bykowski.dev/api';
}

axios.defaults.maxRedirects = 0;
axios.defaults.withCredentials = true;

export const Axios = axios;
