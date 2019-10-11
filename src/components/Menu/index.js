import React from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

export const Menu = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/registration">Registration</Nav.Link>
        <Nav.Link as={Link} to="/actions-list">Actions</Nav.Link>
      </Nav>
    </Navbar>
  );
};