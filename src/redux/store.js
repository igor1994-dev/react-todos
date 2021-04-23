import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './rootReducer';
import { persistStore } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
))
const persistor = persistStore(store)

export default store;
export { persistor };