import { createStore, combineReducers } from 'redux';
import reducer from './reducers';

export const rootReducer = combineReducers({
    reducer
});

const store = createStore(rootReducer);

export default store;