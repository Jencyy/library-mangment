// bookReducer.js

import {
    ADD_BOOK,
    DELETE_BOOK,
    UPDATE_BOOK,
    SINGLE_BOOK,
    ADD_BOOKS_SUCCESS,
    LOADING
} from '../Action/itemActions';

const initialState = {
    book: null,
    books: [],
    isLoading: false,
    error: null
};

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BOOK:
            return {
                ...state,
                books: [...state.books, action.payload],
                isLoading: false
            };
        case DELETE_BOOK:
            return {
                ...state,
                books: state.books.filter(book => book.id !== action.payload),
                isLoading: false
            };
        case UPDATE_BOOK:
            return {
                ...state,
                books: state.books.map(book =>
                    book.id === action.payload.id ? action.payload : book
                ),
                isLoading: false
            };
        case SINGLE_BOOK:
            return {
                ...state,
                book: action.payload,
                isLoading: false
            };
        case ADD_BOOKS_SUCCESS:
            return {
                ...state,
                books: action.payload,
                isLoading: false
            };
        case LOADING:
            return {
                ...state,
                isLoading: true
            };
        default:
            return state;
    }
};

export default bookReducer;
