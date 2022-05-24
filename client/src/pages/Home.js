import React from "react";
//signup, login, description/directions of the game
import { Link } from "react-router-dom";
import './../components/Game.css'

const Home = () => {
  return <div className="container">
    <p className="instructs">Here at Letter Scramble we use games to teach early english spelling. our alphabet game and our spelling game that goes through spelling words up to a fourth grade level</p>
    <div className="instructs">
      <p>Try one of our games</p>
      <button><Link to="/game" className="btn-l">Games</Link></button>

    </div>
  </div>;
};

export default Home;
