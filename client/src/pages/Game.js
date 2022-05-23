// WHEN user clicks correct letter the letter will appear in its place
//IF the user chooses the wrong letter, MODAL (visual component along with text, targeting non-readers/users) will appear indicating the user has chosen incorrectly.
// WHEN the user finishes the entire alphabet, in the correct order, the user is shown a video to reenforce what they just learned.
// DISPLAY Stats to track after each completed game. (Ideas: time, accuracy)
// WHEN user finishes the game, user is prompted to either play again or return to profile page. (LATER: can move to the next letter)

import React, { Component, useState } from "react";
import "../components/LetterCard.css";
import "../components/Game.css";
import { Link } from "react-router-dom";
import Timer from "../components/Timer";

function Game() {
  
  // code used from arrayOfAlphabet.js from github
  // buttons to link to game options
  return (
    <div className="lvl-s">
      <div className="lvl-s">
        <label className="lvl-lbl">Alphabet</label>
        <button><Link to="/gametwo/0" className="btn-l">Alphabet Game</Link></button>
      </div>
      <div className="lvl-s">
        <label className="lvl-lbl">Spelling</label>
        <div>
          <button><Link to="/game/1" className="btn-l">Grade One</Link></button>
          <button><Link to="/game/2" className="btn-l">Grade Two</Link></button>
          <button><Link to="/game/3" className="btn-l">Grade Three</Link></button>
          <button><Link to="/game/4" className="btn-l">Grade Four</Link></button>
        </div>
      </div>
      
    </div>
  );
}
export default Game;
