import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooksAsync, deleteBookAsync } from '../../services/Action/bookActions';
import { Form, FormControl, Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import your custom CSS for additional styling

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { books, isLoading } = useSelector((state) => state.booksReducer);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortedBooks, setSortedBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    dispatch(getBooksAsync());
  }, [dispatch]);

  useEffect(() => {
    setSortedBooks(books); // Initialize sortedBooks with books on mount
  }, [books]);

  const handleDelete = (id) => {
    dispatch(deleteBookAsync(id));
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchTerm));
    setSortedBooks(filteredBooks);
  };

  const handleSort = () => {
    let sortedBooksCopy = [...sortedBooks]; // Make a copy of sortedBooks
    if (sortOrder === 'asc') {
      sortedBooksCopy.sort((a, b) => a.year - b.year);
      setSortOrder('desc');
    } else {
      sortedBooksCopy.sort((a, b) => b.year - a.year);
      setSortOrder('asc');
    }
    setSortedBooks(sortedBooksCopy); // Update sortedBooks state
  };

  return (
    <div className="container">
      <div className="header mb-5">
        <h1 className="title text-center display-4">Library Management</h1>
        <p className="subtitle text-center ">Explore and manage your library books</p>
      </div>
      {isLoading ? (
        <div className="loading-spinner">
          <div className="bg">
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        <div className="content">
          <div className="search-sort-bar d-flex justify-content-between align-items-center mb-3">
            <Form inline>
              <FormControl
                type="search"
                placeholder="Search by title"
                value={searchTerm}
                onChange={handleSearch}
                className="mr-sm-2"
              />
            </Form>
            <Button variant="outline-secondary" onClick={handleSort} className="sort-button">
              {sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
            </Button>
          </div>
          <Table striped bordered hover className="custom-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedBooks.map((book) => (
                <tr key={book.id} className="table-row">
                  <td className="table-cell">{book.title}</td>
                  <td className="table-cell">{book.author}</td>
                  <td className="table-cell">{book.genre}</td>
                  <td className="table-cell">{book.year}</td>
                  <td className="action-cell">
                    <Button
                      variant="outline-primary"
                      onClick={() => handleEdit(book.id)}
                      className="action-button"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(book.id)}
                      className="action-button"
                 
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Home;
