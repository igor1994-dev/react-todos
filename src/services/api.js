import axios from "axios";

const api = axios.create({
    // baseURL: 'http://demoapi.rexsoftproduction.com/api/',
    baseURL: '/api',
})

export default api;