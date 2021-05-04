import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todosTypes from './actionTypes';

const persistConfig = {
    key: 'todos',
    storage,
    blacklist: ['list']
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

    // console.log('state', state)
    switch (action.type) {
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
            }

        case todosTypes.CHANGE_TODO:
            return {
                ...state,
                list: [...state.list].map(todo => {
                    if (payload.id === todo.id) {
                        return {
                            ...todo,
                            name: payload.name,
                            description: payload.description,
                            is_done: payload.is_done
                        }
                    }
                    return todo;
                })
            }

        case todosTypes.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: payload.currentPage
            }

        default:
            return state;
    }
}

export default persistReducer(persistConfig, todos);