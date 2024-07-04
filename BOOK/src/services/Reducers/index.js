import { combineReducers } from 'redux';
import booksReducer from './bookReducer';

const rootReducer = combineReducers({
    booksReducer
});

export default rootReducer;
