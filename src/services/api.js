import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mywallet-project-api.herokuapp.com/',
});

export default api;
