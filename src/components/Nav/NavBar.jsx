import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import logo from "../../assets/logo.jpg";
import { useGlobalContext } from "../../utils/globalStateContext";
import "./navbar.css";

const NavBar = () => {
  const navigate = useNavigate();

  // access the user's details from global context
  const { store, dispatch } = useGlobalContext();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate("/dashboard")}>
          <img
            src={logo}
            height="80"
            style={{ paddingTop: "0.5rem" }}
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

            {/* Show manage employees link if signed in user is Admin           */}
            {store.userRole === "admin" && (
              <Nav.Link onClick={() => navigate("/employees")}>
                Manage Employees
              </Nav.Link>
            )}
          </Nav>
          <Navbar.Text>Signed in as: {store.loggedInUserName}</Navbar.Text>

          {/* Show log out button if user is logged in */}
          {store.loggedInUserName && (
            <Button
              id="logout-btn"
              onClick={() => {
                console.log("logged out");
                // set token to null when user has logged out
                dispatch({
                  type: "setToken",
                  data: null,
                });
                dispatch({
                  type: "setLoggedInUserName",
                  data: null,
                });
                dispatch({
                  type: "setUserRole",
                  data: null,
                });
              }}
            >
              LOG OUT
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
