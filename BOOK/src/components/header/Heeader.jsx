import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Heeader.css'; // Import your custom CSS for additional styling

const Header = () => (
  <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
    <Navbar.Brand as={Link} to="/" className="ms-4">Library Management</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
        <Nav.Link as={Link} to="/create" className="nav-link-custom">Create</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
