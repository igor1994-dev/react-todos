import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todosTypes from './actionTypes';

const persistConfig = {
    key: 'users',
    storage
}

const initialState = {};

function todos(state = initialState, action) {
    const payload = action.payload;

    switch (action.type) {
        case todosTypes.ADD_ITEM:
            const currentUserTodos = state[payload.email] || [];
            return {
                ...state,
                [payload.email]: [...currentUserTodos, {
                    id: payload.id,
                    text: payload.text,
                    completed: payload.completed,
                    description: payload.description,
                    creationDate: payload.creationDate
                }]
            };
        case todosTypes.DELETE_ITEM:
            return {
                ...state,
                [payload.email]: state[payload.email].filter(todo => todo.id !== payload.id)
            }
        case todosTypes.CHANGE_TEXT:
            return {
                ...state,
                [payload.email]: state[payload.email].map(todo => {
                    if (payload.id === todo.id) {
                        todo.text = payload.text;
                        todo.description = payload.description;
                    }
                    return todo;
                })
            }
        case todosTypes.CHANGE_COMPLETED:
            return {
                ...state,
                [payload.email]: state[payload.email].map(todo => {
                    if (payload.id === todo.id) todo.completed = payload.completed;
                    return todo;
                })
            }
        default:
            return state;
    }
}

export default persistReducer(persistConfig, todos);