import React, { useEffect, useState } from 'react';
import { Container, Form, Row, Button, Col, Spinner, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { singleBookAsync, updateBookAsync } from '../../services/Action/bookActions';
import './EditBook.css'; // Import your custom CSS for additional styling

const EditBook = () => {
  const { id } = useParams();
  const { book, isLoading, error } = useSelector((state) => state.booksReducer);

  const [inputState, setInputState] = useState({
    id: '',
    title: '',
    author: '',
    genre: '',
    publicationYear: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(singleBookAsync(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (book) {
      setInputState(book);
    }
  }, [book]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBookAsync(inputState));
    navigate('/');
  };

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <Container>
      <h1 className="text-center display-4">Edit Book</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Control type="hidden" value={inputState.id} name="id" />
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={inputState.title}
                name="title"
                onChange={handleInput}
                className="form-input"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Author"
                value={inputState.author}
                name="author"
                onChange={handleInput}
                className="form-input"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formGridGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Genre"
                value={inputState.genre}
                name="genre"
                onChange={handleInput}
                className="form-input"
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridPublicationYear">
              <Form.Label>Publication Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Publication Year"
                value={inputState.publicationYear}
                name="publicationYear"
                onChange={handleInput}
                className="form-input"
              />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit" className="submit-button">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default EditBook;
