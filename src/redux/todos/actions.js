import axios from 'axios';
import api from '../../services/api';
import actionTypes from './actionTypes';

export function addTodo(name, description, expired_at) {
    return (dispatch, getState) => {

        dispatch({ type: actionTypes.ADD_ITEM });

        api.post('/tasks', {
            name,
            description,
            expired_at
        })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    error.response.data.forEach(validationError => {
                        alert(validationError.message);
                    })
                }
            })
    }
}

export function loadTodos(currentPage = 1) {
    return (dispatch, getState) => {
        const { pageSize } = getState().todos;
        const offset = currentPage === 1 ? 0 : currentPage * pageSize - pageSize;

        dispatch({
            type: actionTypes.SET_CURRENT_PAGE,
            payload: { currentPage: currentPage }
        });

        dispatch({
            type: actionTypes.LOAD_ITEMS_REQUEST,
        });

        api.get('/tasks', {
            params: {
                limit: pageSize,
                offset,
            }
        })
            .then(response => {
                dispatch({
                    type: actionTypes.LOAD_ITEMS_SUCCESS,
                    payload: {
                        list: response.data.data,
                        todosTotalCount: parseInt(response.data.total),
                    }
                })
            })
            .catch(error => {
                console.log('GET todos error', error);
                dispatch({
                    type: actionTypes.LOAD_ITEMS_FAILURE,
                })
            })
    }
}


export function deleteTodo(id) {
    return (dispatch) => {

        api.delete(`/tasks/${id}`)
            .then(response => {
                dispatch({ type: actionTypes.DELETE_ITEM, payload: { id } })
            })
            .catch(error => {
                console.log(error.response)
                if (error.response.status === 404) alert(error.response.data.notification);
            })

    }
}

export function changeTodo(id, name, is_done, description) {
    return (dispatch) => {
        api.patch(`/tasks/${id}`, {
            name,
            is_done,
            description
        })
            .then(response => {
                dispatch({ type: actionTypes.CHANGE_TEXT })
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    error.response.data.forEach(validationError => {
                        alert(validationError.message);
                    })
                } else if (error.response.status === 404) {
                    alert(error.response.data.notification);
                }
            })
    }
}


export function setCurrentPage(currentPage) {
    return (dispatch, getState) => {
        const { pageSize } = getState().todos;

        const offset = currentPage === 1 ? 0 : currentPage * pageSize - pageSize;

        dispatch({
            type: actionTypes.SET_CURRENT_PAGE,
            payload: { currentPage: currentPage }
        });

        dispatch({
            type: actionTypes.LOAD_ITEMS_REQUEST,
        });

        api.get('/tasks', {
            params: {
                limit: pageSize,
                offset: offset
            }
        })
            .then(response => {
                dispatch({
                    type: actionTypes.LOAD_ITEMS_SUCCESS,
                    payload: {
                        list: response.data.data,
                        todosTotalCount: parseInt(response.data.total),
                        currentPage: currentPage
                    }
                })
            })
            .catch(error => {
                console.log('GET todos error', error);
            })
    }
}




// export function setCurrentPage(currentPage) {
//     return (dispatch) => {

//         dispatch({
//             type: actionTypes.SET_CURRENT_PAGE,
//             payload: { currentPage: currentPage }
//         })
//     }
// }
