import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import logo from '../assets/logo.jpg'

const NavBar = () => {

  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate("/dashboard")}>
          <img
            src={logo}
            height="50"
            className="d-inline-block align-top"
            alt="My Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/dashboard")}>
              Dashboard
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/animals")}>
              View All Animals
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/add-animal")}>
              Add New Animal
            </Nav.Link>

            {/* if signed in user is Admin           */}
            <Nav.Link onClick={() => navigate("/employees")}>
              Manage Employees
            </Nav.Link>
          </Nav>
          <Button>LOG OUT</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar