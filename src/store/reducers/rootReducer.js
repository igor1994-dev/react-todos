import { combineReducers } from "redux";
import todos from './todos';
import users from "./users";
import auth from "./auth";

export const rootReducer = combineReducers({
    todos: todos,
    users: users,
    auth: auth
})