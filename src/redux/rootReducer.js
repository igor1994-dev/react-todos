import { combineReducers } from "redux";
import todos from './todos/reducer';
import users from "./users/reducer";
import auth from "./auth/reducer";

export const rootReducer = combineReducers({
    todos: todos,
    users: users,
    auth: auth
})