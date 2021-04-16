import axios from 'axios';

//  json-server db.json --port 3001

export const axiosApi = axios.create({
  baseURL: 'http://localhost:3001',
});