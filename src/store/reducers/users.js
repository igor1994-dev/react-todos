import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = { list: [] };

const persistConfig = {
    key: 'users',
    storage
}

function users(state = initialState, action) {
    switch (action.type) {
        case 'ADD_USER':
            return {
                ...state,
                list: [...state.list, {
                    login: action.login,
                    password: action.password
                }]
            }
        default:
            return state;
    }
}

export default persistReducer(persistConfig, users);