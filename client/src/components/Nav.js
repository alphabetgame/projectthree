import React from "react";
import Auth from "../utils/auth";
import "../components/Nav.css";
import Header from "./Header";
import { Container, Navbar, Nav } from "react-bootstrap";

function Navigation() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        // <nav className="nav">
        //   <div className="container">
        //     <div className="home-page-list">
        //       <ul className="flex-row">
        //         <li className="mx-1"></li>
        //         <li className="mx-1">
        //           {/* this is not using the Link component to logout or user and then refresh the application to the start */}
        //           <a href="/" onClick={() => Auth.logout()}>
        //             Logout
        //           </a>
        //         </li>
        //       </ul>
        //     </div>
        //   </div>
        // </nav>
        <Navbar bg="light" expand="lg">
          <Container className="nav-bar">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="me-auto">
              <Nav.Link href="/" onClick={() => Auth.logout()}></Nav.Link>
            </Nav>
            ]{" "}
          </Container>
        </Navbar>
      );
    } else {
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
              <a href="#home">Letter Scramble</a>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="me-auto">
              <Nav.Link eventKey="#home">Home</Nav.Link>
              <Nav.Link eventKey="#signup">Sign Up</Nav.Link>
              <Nav.Link eventKey="#login">Login</Nav.Link>
              <Nav.Link eventKey="#game">Game</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      );
    }
  }

  return (
    <Navbar>
      <Header>{showNavigation()}</Header>
    </Navbar>
  );
}

export default Navigation;
