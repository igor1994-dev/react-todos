import { createStore, compose } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { persistStore } from 'redux-persist'

const store = createStore(rootReducer, compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
const persistor = persistStore(store)

export default store;
export { persistor };