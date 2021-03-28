import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
    isAuth: false,
    email: null
};

const persistConfig = {
    key: 'auth',
    storage
}

function auth(state = initialState, action) {
    switch (action.type) {
        case 'AUTH_SUCCESS':
            return {
                isAuth: true,
                email: action.email
            }
        case 'LOGOUT':
            return {
                isAuth: false,
                email: null
            }
        default:
            return state;
    }
}

export default persistReducer(persistConfig, auth);