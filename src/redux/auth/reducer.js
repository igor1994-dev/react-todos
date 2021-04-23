import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import types from './actionTypes';

const initialState = {
    isLoading: false,
    isAuth: false,
    email: null,
    token: null,
};

const persistConfig = {
    key: 'auth',
    storage
}

function auth(state = initialState, action) {
    const payload = action.payload;

    switch (action.type) {
        case types.SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case types.SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuth: true,
            }
        case types.SIGNUP_FAILURE:
            return {
                ...state,
                isLoading: false,
            }

        case types.SIGNIN:
            return {
                ...state,
                isLoading: true
            }
        case types.AUTH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuth: true,
                email: payload.email,
                token: payload.token,
            }
        case types.AUTH_FAILURE:
            return {
                ...state,
                isLoading: false,
            }
        case types.LOGOUT:
            return {
                ...state,
                isAuth: false,
                email: null,
                token: null,
            }
        default:
            return state;
    }
}

export default persistReducer(persistConfig, auth);