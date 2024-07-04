import axios from 'axios';
import generateUniqueId from 'generate-unique-id';
import {
    ADD_BOOK,
    DELETE_BOOK,
    UPDATE_BOOK,
    SINGLE_BOOK,
    ADD_BOOKS_SUCCESS,
    LOADING
} from './itemActions';

export const addBook = (book) => ({
    type: ADD_BOOK,
    payload: book,
});

export const deleteBook = (id) => ({
    type: DELETE_BOOK,
    payload: id,
});

export const updateBook = (book) => ({
    type: UPDATE_BOOK,
    payload: book,
});

export const singleBook = (book) => ({
    type: SINGLE_BOOK,
    payload: book,
});

export const loading = () => ({
    type: LOADING,
});

export const addBookSuccess = (books) => ({
    type: ADD_BOOKS_SUCCESS,
    payload: books,
});

export const addBookAsync = (book) => {
    return (dispatch) => {
        dispatch(loading());
        book.id = generateUniqueId({
            length: 24,
            useLetters: true,
            useNumbers: true
        });
        axios.post('http://localhost:3004/books', book)
            .then(() => dispatch(getBooksAsync()))
            .catch((err) => console.error(err));
    };
};

export const getBooksAsync = () => {
    return (dispatch) => {
        dispatch(loading());
        axios.get('http://localhost:3004/books')
            .then((res) => dispatch(addBookSuccess(res.data)))
            .catch((err) => console.error(err));
    };
};

export const deleteBookAsync = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3004/books/${id}`)
            .then(() => dispatch(getBooksAsync()))
            .catch((err) => console.error(err));
    };
};
export const singleBookAsync = (id) => {
    return (dispatch) => {
        dispatch(loading());
        axios.get(`http://localhost:3004/books/${id}`)
            .then((res) => dispatch(singleBook(res.data)))
            .catch((err) => {
                dispatch({ type: 'ERROR', payload: err.message });
                console.error(err);
            });
    };
};

export const updateBookAsync = (book) => {
    return (dispatch) => {
        axios.put(`http://localhost:3004/books/${book.id}`, book)
            .then(() => dispatch(getBooksAsync()))
            .catch((err) => {
                dispatch({ type: 'ERROR', payload: err.message });
                console.error(err);
            });
    };
};

