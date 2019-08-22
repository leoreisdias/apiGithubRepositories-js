import axios from 'axios';

//Como todas req partem dessa url, configurar como baseURL
const api = axios.create({
    baseURL: 'https://api.github.com',
});

export default api;