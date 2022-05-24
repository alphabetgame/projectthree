import React from "react";
import { Link } from "react-router-dom";
import "../components/Home.css";
//signup, login, description/directions of the game

const Home = () => {
  return (
    <div className="container">
      <p className="about">
        Welcome to Letter Scramble! Where you can play games to teach early
        english spelling. Our alphabet game and our spelling game that goes
        through spelling words up to a fourth grade level.
      </p>
      <div className="about">
        <p>Try one of our games!</p>
        <button><Link to="/game" className="game-l">Games</Link></button>
      </div>
    </div>
  );
};

export default Home;
