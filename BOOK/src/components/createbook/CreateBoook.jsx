import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addBookAsync } from '../../services/Action/bookActions';
import './CreateBoook.css'; // Import your custom CSS for additional styling

const CreateBook = () => {
    const [book, setBook] = useState({ title: '', author: '', genre: '', year: '' });
    const isLoading = useSelector(state => state.booksReducer.isLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addBookAsync(book));
        navigate('/');
    };

    return (
        <div className="container ">
            <h2 className="form-title display-4">Add New Book</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formAuthor">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formGenre">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control
                        type="text"
                        name="genre"
                        value={book.genre}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formYear">
                    <Form.Label>Publication Year</Form.Label>
                    <Form.Control
                        type="number"
                        name="year"
                        value={book.year}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <div className="form-actions">
                    <Button
                        variant="outline-secondary"
                        type="submit"
                        disabled={isLoading}
                        className="submit-button"
                    >
                        {isLoading ? (
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        ) : (
                            'Add Book'
                        )}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CreateBook;
