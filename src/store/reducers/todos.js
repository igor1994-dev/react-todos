import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'users',
    storage
}

const initialState = {};

function todos(state = initialState, action) {
    switch (action.type) {
        case "ADD_ITEM":
            const currentUserTodos = state[action.email] || [];
            return {
                ...state,
                [action.email]: [...currentUserTodos, {
                    id: action.id,
                    text: action.text,
                    completed: action.completed,
                    description: action.description,
                    creationDate: action.creationDate
                }]
            };
        case "DELETE_ITEM":
            return {
                ...state,
                [action.email]: state[action.email].filter(todo => todo.id !== action.id)
            }
        case "CHANGE_TEXT":
            return {
                ...state,
                [action.email]: state[action.email].map(todo => {
                    if (action.id === todo.id) {
                        todo.text = action.text;
                        todo.description = action.description;
                    }
                    return todo;
                })
            }
        case "CHANGE_COMPLETED":
            return {
                ...state,
                [action.email]: state[action.email].map(todo => {
                    if (action.id === todo.id) todo.completed = action.completed;
                    return todo;
                })
            }
        default:
            return state;
    }

}

export default persistReducer(persistConfig, todos);