import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import usersTypes from './actionTypes';

const initialState = { list: [] };

const persistConfig = {
    key: 'users',
    storage
}

function users(state = initialState, action) {
    const payload = action.payload;

    switch (action.type) {
        case usersTypes.ADD_USER:
            return {
                ...state,
                list: [...state.list, {
                    login: payload.login,
                    password: payload.password
                }]
            }
        default:
            return state;
    }
}

export default persistReducer(persistConfig, users);