import React from "react";
import Auth from "../utils/auth";
import "../components/Nav.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import logo from "../assets/images/egglogo.jpg";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

function Navigation() {
  function showNavigation() {
    const isLoggedIn = Auth.loggedIn();
    return (
      <Navbar className="navbar" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img id="logo" src={logo} alt="Happy Egg Sunny Side up" />
            </Link>
            {/* <Link to="/">Letter Scramble</Link> */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/signup">Sign Up</Link>
              <Link to="/game">Game</Link>
              {isLoggedIn ? (
                <Link to="/" onClick={() => Auth.logout()}>
                  Logout
                </Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
              <NavDropdown.Divider />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return <div>{showNavigation()}</div>;
}

export default Navigation;
