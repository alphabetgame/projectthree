import React from "react";
import Auth from "../utils/auth";
import "../components/Nav.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import { Container, Navbar, Nav } from "react-bootstrap";

function Navigation() {
  function showNavigation() {
    const isLoggedIn = Auth.loggedIn();
    return (
      // <div className="container">
      //   <ul className="flex-row">
      //     <li className="mx-1">
      //       <Link to="/">Home/Logo</Link>
      //     </li>
      //     <li className="mx-1">
      //       <Link to="/signup">Signup</Link>
      //     </li>
      //     <li className="mx-1">
      //       <Link to="/login">Login</Link>
      //     </li>
      //     <li className="mx-1">
      //       <Link to="/game">Game</Link>
      //     </li>
      //   </ul>
      // </div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/">Letter Scramble</Link>
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return <div>{showNavigation()}</div>;
}

export default Navigation;
