import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todosTypes from './actionTypes';

const persistConfig = {
    // key: 'users',
    key: 'todos',
    storage
}

const initialState = {
    isLoading: false,
    list: [],
    pageSize: 10,
    todosTotalCount: 0,
    currentPage: 1,
};

function todos(state = initialState, action) {
    const payload = action.payload;

    console.log('state', state)
    // console.log('payload', payload)
    switch (action.type) {
        // case todosTypes.ADD_ITEM:
        //     const currentUserTodos = state[payload.email] || [];
        //     return {
        //         ...state,
        //         [payload.email]: [...currentUserTodos, {
        //             id: payload.id,
        //             text: payload.text,
        //             completed: payload.completed,
        //             description: payload.description,
        //             creationDate: payload.creationDate
        //         }]
        //     };

        case todosTypes.ADD_ITEM:
            return {
                ...state
            }
        case todosTypes.LOAD_ITEMS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case todosTypes.LOAD_ITEMS_SUCCESS:
            return {
                ...state,
                list: [...payload.list],
                isLoading: false,
                todosTotalCount: payload.todosTotalCount,
            }
        case todosTypes.LOAD_ITEMS_FAILURE:
            return {
                ...state,
                isLoading: false,
            }
        case todosTypes.DELETE_ITEM:
            return {
                ...state,
                list: [...state.list].filter(todo => todo.id !== payload.id)
                // [payload.email]: state[payload.email].filter(todo => todo.id !== payload.id)
            }

        case todosTypes.CHANGE_TEXT:
            return {
                ...state,
                // [payload.email]: state[payload.email].map(todo => {
                //     if (payload.id === todo.id) {
                //         todo.text = payload.text;
                //         todo.description = payload.description;
                //     }
                //     return todo;
                // })
            }

        case todosTypes.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: payload.currentPage
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