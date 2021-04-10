import { combineReducers } from "redux";
import todos from './todos/todos';
import users from "./users/users";
import auth from "./auth/auth";

export const rootReducer = combineReducers({
    todos: todos,
    users: users,
    auth: auth
})