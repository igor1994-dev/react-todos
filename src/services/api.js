import axios from "axios";

const api = axios.create({
    // baseURL: 'http://demoapi.rexsoftproduction.com/api/',
    baseURL: '/api',
})

export default api;

/*
    dispatch({type: 'GET_TODOS_REQUEST'}) // isLoading: true,
    api.get('/todos')
        .then(response => {
            dispatch({type: 'GET_TODOS_SUCCESS', payload: { todos: response.todos }}) // isLoading: false, todos: payload.todos
        })
        .catch(response => {
            dispatch({type: 'GET_TODOS_FAILURE' // isLoading: false, todos: []
        })

    // actionCreators
    function getTodos(dispatch, getState) {
        dispatch({type: 'GET_TODOS_REQUEST'}) // isLoading: true,
        api.get('/todos')
        .then(response => {
            dispatch({type: 'GET_TODOS_SUCCESS', payload: { todos: response.todos }}) // isLoading: false, todos: payload.todos
        })
        .catch(response => {
            dispatch({type: 'GET_TODOS_FAILURE' // isLoading: false, todos: []
        })  
    }
*/

