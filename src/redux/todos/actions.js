import api from '../../services/api';
import actionTypes from './actionTypes';

export function addTodo(name, description, expired_at, setModal) {
    return (dispatch, getState) => {

        dispatch({ type: actionTypes.ADD_ITEM });

        api.post('/tasks', {
            name,
            description,
            expired_at
        })
            .then(response => {
                // console.log('response', response)
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    error.response.data.forEach(validationError => {
                        // console.log('seeeetMODAL', setModal)
                        setModal({
                            isOpen: true,
                            text: validationError.message
                        })
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
                dispatch({
                    type: actionTypes.LOAD_ITEMS_FAILURE,
                })
            })
    }
}


export function deleteTodo(id, setModal) {
    return (dispatch) => {

        api.delete(`/tasks/${id}`)
            .then(response => {
                dispatch({ type: actionTypes.DELETE_ITEM, payload: { id } })
            })
            .catch(error => {
                // console.log('setModal', setModal)
                if (error.response.status === 404) {
                    setModal({ isOpen: true, text: error.response.data.notification })
                }
            })

    }
}

export function changeTodo(id, name, is_done, description, setModal) {
    return (dispatch) => {
        api.patch(`/tasks/${id}`, {
            name,
            is_done,
            description
        })
            .then(response => {
                dispatch({
                    type: actionTypes.CHANGE_TODO,
                    payload: {
                        id,
                        name,
                        is_done,
                        description
                    }
                })
                if (response.status === 200) setModal({ isOpen: true, text: response.data.notification })
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    error.response.data.forEach(validationError => {
                        setModal({ isOpen: true, text: validationError.message })
                        // alert(error.response.status + ' ' + validationError.message);
                    })
                } else if (error.response.status === 404) {
                    // alert(error.response.status + ' ' + error.response.data.notification);
                    setModal({ isOpen: true, text: error.response.data.notification })
                }
            })
    }
}

