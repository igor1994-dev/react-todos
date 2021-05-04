import api from '../../services/api';
import actionTypes from './actionTypes';

export function signup(email, password, setModal) {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.SIGNUP_REQUEST });

        api.post('/auth/registration', {
            email,
            password,
        })
            .then(response => {
                dispatch({ type: actionTypes.SIGNUP_SUCCESS });
            })
            .catch(error => {
                dispatch({ type: actionTypes.SIGNUP_FAILURE });

                if (error.response && error.response.status === 422) {
                    error.response.data.forEach(validationError => {
                        setModal({
                            isOpen: true,
                            text: validationError.message
                        })
                    })
                }

            })
    }
}

export function signin(email, password, setModal) {
    return (dispatch, getState) => {
        dispatch({ type: actionTypes.SIGNIN });

        api.post('/auth/login', {
            email,
            password,
        })
            .then(response => {
                const responseToken = "Bearer " + response.data.token;
                api.defaults.headers.common['Authorization'] = responseToken;

                dispatch({
                    type: actionTypes.AUTH_SUCCESS,
                    payload: { email: email, token: responseToken }
                })
            })
            .catch(error => {
                dispatch({ type: actionTypes.AUTH_FAILURE })

                if (error.response) {
                    setModal({
                        isOpen: true,
                        text: error.response.status + ' ' + error.response.data.notification
                    })
                }
            })
    }
}

export function logout() {
    return {
        type: actionTypes.LOGOUT
    }
}