import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import types from './actionTypes';

const initialState = {
    isAuth: false,
    email: null
};

const persistConfig = {
    key: 'auth',
    storage
}

function auth(state = initialState, action) {
    const payload = action.payload;

    switch (action.type) {
        case types.AUTH_SUCCESS:
            return {
                isAuth: true,
                email: payload.email
                // email: action.email
            }
        case types.LOGOUT:
            return {
                isAuth: false,
                email: null
            }
        default:
            return state;
    }
}

export default persistReducer(persistConfig, auth);