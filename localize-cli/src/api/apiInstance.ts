import axios from 'axios';
import {getApiKey, getBaseUrl} from '../config';

const $api = axios.create();

$api.interceptors.request.use((config) => {
  config.headers['api-key'] = getApiKey();
  config.baseURL = getBaseUrl()
  return config;
});

export default $api