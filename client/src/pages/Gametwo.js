// WHEN user clicks correct letter the letter will appear in its place
//IF the user chooses the wrong letter, MODAL (visual component along with text, targeting non-readers/users) will appear indicating the user has chosen incorrectly.
// WHEN the user finishes the entire alphabet, in the correct order, the user is shown a video to reenforce what they just learned.
// DISPLAY Stats to track after each completed game. (Ideas: time, accuracy)
// WHEN user finishes the game, user is prompted to either play again or return to profile page. (LATER: can move to the next letter)

import React, { Component, useState, useEffect } from "react";
import "../components/LetterCard.css";
import "../components/Game.css";
import Letter from "../components/Letter";

//import Timer from "../components/Timer";
import { QUERY_GAMES } from "../utils/query";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_SCORE } from "../utils/mutations";
import { Link, useParams } from "react-router-dom";

function Gametwo() {
  const { level } = useParams();
  const { loading, data } = useQuery(QUERY_GAMES);
  const words = data?.games[level].solution.split(",") || [];

  const [letters, setLetters] = useState([]);
  const [shuffleLetters, setShuffleLetters] = useState([]);
  const [alphabetPosition, setAlphabetPosition] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  // new timer stuff
  const [start, setStart] = useState();
  const [now, setNow] = useState(start);
  const seconds = Math.floor((now - start) / 1000);
  const secondsLeft = 10 - seconds;
  const [timerActive, setTimerActive] = useState(false);
  const [promptHidden, setPromptHidden] = useState(true);
  const [gameHidden, setGameHidden] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [addScore, { error }] = useMutation(ADD_SCORE);
  // const [pickedWord, setPickedWord] = useState([]);

  const delay = (time) => new Promise((res) => setTimeout(res, time));

  const handleWord = (word) => {
    //  choose item form array of words
    const letters = word[Math.floor(Math.random() * word.length)].split("");

    return letters;
  };

  // add score

  // handleclick function for when guesses are made
  const handleCardClick = (e, letter) => {
    //  when a card is clicked, this is what goes here
    if (gameOver != true) {
      if (letter === letters[alphabetPosition]) {
        const newPosition = alphabetPosition + 1;
        setAlphabetPosition(newPosition);
        e.target.classList.add("hidden");
      }
      if (alphabetPosition === letters.length - 1) {
        console.log("game over - you win");
        setTimerActive(false);
        setGameOver(true);
        setHasWon(true);
        try {
          const { data } = addScore({
            variables: {
              game: level.toString(),
              score: secondsLeft,
            },
          });
        } catch (err) {
          console.error(err);
        }
      }
    }
    //set to default state once game over
    //if statement that checks whether the user chose correctly or not
  };

  function endGame() {
    if(hasWon) {
      document.getElementById("winloss").classList.add("win");
      // const currentLevel = "/gametwo/" + level.toString();
      // const newLvl = 3;
      // const nextLevel = "/gametwo/" + newLvl.toString();
      // // return (
      //   <div className="banny">
      //     <h4>You won!</h4>
      //     <div>
      //       <button><Link to={currentLevel} onClick={() => window.location.reload()}>Play Again?</Link></button>
      //       <button><Link to={nextLevel}>Next Game</Link></button>
      //     </div>
      //   </div>
      // )
    } else if (gameOver && !hasWon) {
      document.getElementById("winloss").classList.add("lose");
      // return (
      //   <div className="banny">
      //     <h4>Game over :/</h4>
      //     <div>
      //       <button><Link to="/gametwo/2" onClick={() => window.location.reload()}>Play Again?</Link></button>
      //       <button><Link to="/">Home</Link></button>
      //     </div>
      //   </div>
      // )
}
  
  
};
  //   shuffle letters function
  const shuffled = (letters) =>
    letters
      .map((value) => ({
        value,
        sort: Math.random(),
      }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

  // new timer function based on real time
  function Timer() {
    useEffect(() => {
      if (timerActive === true) {
        const interval = setInterval(() => setNow(Date.now(), 1000));
        if (secondsLeft <= 0) {
          console.log("out of time");
          setTimerActive(false);
          setGameOver(true);
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }
    });

    return <div className="">Seconds remaining: {secondsLeft}</div>;
  }
  // showprompt function
  const showPrompt = async () => {
    setPromptHidden(false);
    await delay(5000);
    // hide word prompt
    setPromptHidden(true);
  };

  // start game function
  const playGameButton = async (event) => {
    event.preventDefault();
    const pickedWord = handleWord(words);
    setLetters(pickedWord);
    // hide instructions
    document.getElementById("instructions").classList.add("hidden");
    document.getElementById("play").classList.add("hidden");
    // show word prompt then remove
    await showPrompt();
    // activate game after show prompt, timer and shuffled letters
    setStart(Date.now());
    setTimerActive(true);
    setShuffleLetters(shuffled(pickedWord));
    setGameHidden(false);
  };

  // WHEN game starts, display alphabet cards when game begins for 5 seconds, then letters disapear, then display alphabet out of order at bottom

  return (
    <div className="t-cont">
      {!gameOver ? null :
      hasWon ? (<div className="banny">
      <h4>You won!</h4>
      <div>
        <button><Link to="/gametwo/2" className="btn-l" onClick={() => window.location.reload()}>Play Again</Link></button>
        <button><Link to="/gametwo/3" className="btn-l">Next Game</Link></button>
      </div>
    </div>) : ( <div className="banny">
          <h4>Game over</h4>
          <div>
            <button><Link to="/gametwo/2" className="btn-l" onClick={() => window.location.reload()}>Play Again</Link></button>
            <button><Link to="/" className="btn-l">Home</Link></button>
          </div>
        </div>)}
      <div id="winloss" className="game-cont">
        
        
        {promptHidden ? null : (
          <div id="prompt" className="container">
            {letters.map((letter) => (
              <Letter letter={letter} />
            ))}
          </div>
        )}
        {gameHidden ? (
          <>
            <div id="instructions" className="instructs">
              <label htmlFor="instructions" className="ins-lbl">Instructions</label>
              <p className="ins-p">When you hit the Play Game button a word will be displayed for 5
              seconds. Its letters will then get scrambled, and you'll have 10 seconds
              to spell it correctly!</p>
            </div>
            <div className="ply-btn">
              <button id="play" className="" onClick={playGameButton}>
                Play!
              </button>
            </div>
          </>
        ) : (
          <>
            <Timer />
            <div className="container">
              {shuffleLetters.map((letter) => (
                <Letter letter={letter} handleCardClick={handleCardClick} />
              ))}
            </div>
          </>
        )}
      </div>
      
    </div>
  );
}
export default Gametwo;
