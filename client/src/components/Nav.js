import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import "../components/Nav.css";

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <nav className="nav">
          <div className="container">
            <div className="home-page-list">
              <ul className="flex-row">
                <li className="mx-1"></li>
                <li className="mx-1">
                  {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                  <a href="/" onClick={() => Auth.logout()}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <nav>
          <ul className="flex-row">
            <li className="mx-1">
              <Link to="/">Home/Logo</Link>
            </li>
            <li className="mx-1">
              <Link to="/signup">Signup</Link>
            </li>
            <li className="mx-1">
              <Link to="/login">Login</Link>
            </li>
            <li className="mx-1">
              <Link to="/game">Game</Link>
            </li>
          </ul>
        </nav>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
