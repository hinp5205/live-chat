import axios from 'axios';

const API_URL = process.env.API_URL || '';
const httpClient = axios.create();

// Add a request interceptor
httpClient.interceptors.request.use(
  function (config) {
    // Add token in here
    config.url = API_URL + config.url;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default httpClient;
