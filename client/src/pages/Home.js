import React from "react";
import { Link } from "react-router-dom";
import "../components/Home.css";
//signup, login, description/directions of the game
import { Link } from "react-router-dom";
import './../components/Game.css'

const Home = () => {

  return (
    <div className="container">
      <p className="about">Welcome to Letter Scramble! </p>
      <p className="subhead">
        These engaging word games are designed to help kids practice their
        English spelling from home. Once you choose a level, you'll see a word
        pop up on the screen. Then, the word will disappear and reappear
        scrambled. Your job is to click the cards in the correct order to spell
        the original word. Good luck and happy spelling!
      </p>

      <div className="about">
        <p>Try one of our games!</p>
        <button>
          <Link to="/game" className="game-l">
            Games
          </Link>
        </button>
      </div>
    </div>
  );

};

export default Home;
