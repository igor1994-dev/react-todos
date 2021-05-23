import axios from "axios";
import store from '../redux/store';
import actionTypes from '../redux/auth/actionTypes';


const api = axios.create({
    // baseURL: 'http://demoapi.rexsoftproduction.com/api/',
    baseURL: '/api',
});


api.interceptors.response.use(
    response => response,
    (error) => {
        if (error.response.status === 401) {
            store.dispatch({ type: actionTypes.LOGOUT });
            window.location = '/signin';
        }
    }
)




export default api;