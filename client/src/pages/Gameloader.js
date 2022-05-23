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
  // level of difficulty passed in using params
  const { level } = useParams();
  // variables for link pages
  const playAgain = "/gametwo/" + level;
  const nxtLvl = parseInt(level)+1;
  const nextGame = "/gametwo/"+ nxtLvl;
  
  // query game for the array of data based on difficulty
  const { loading, data } = useQuery(QUERY_GAMES);
  // gathers all words from the level of difficulty
  const words = data?.games[level].solution.split(",") || [];
  // letter states
  const [letters, setLetters] = useState([]);
  const [shuffleLetters, setShuffleLetters] = useState([]);
  const [alphabetPosition, setAlphabetPosition] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  // new timer stuff

  const [start, setStart] = useState();
  const [now, setNow] = useState(start);
  const seconds = Math.floor((now - start) / 1000);
  const secondsLeft = 10 - seconds;
  // display states
  const [timerActive, setTimerActive] = useState(false);
  const [promptHidden, setPromptHidden] = useState(true);
  const [gameHidden, setGameHidden] = useState(true);
  // game over state
  const [gameOver, setGameOver] = useState(false);
  const [addScore, { error }] = useMutation(ADD_SCORE);
  // const [pickedWord, setPickedWord] = useState([]);

  const delay = (time) => new Promise((res) => setTimeout(res, time));
  // Function to pick a word at random from the list of words in the appropriate difficulty array, passed once the game is started
  const handleWord = (word) => {
    //  choose one word from array of words
    const letters = word[Math.floor(Math.random() * word.length)].split("");

    return letters;
  };

  // handleclick function for each time the user makes a guess
  const handleCardClick = (e, letter) => {
    //  as long as game over is not true, we check if the guess they made is correct or not
    if (gameOver != true) {
      // we compare the letter clicked to the letters state (which contains the solution) versus the alphabet position, which is essentially a marker of where in the word is correct
      if (letter === letters[alphabetPosition]) {
        // if the guess was correct, we move the alphabetPosition up one so that they have to then guess the next letter correctly
        const newPosition = alphabetPosition + 1;
        setAlphabetPosition(newPosition);
        // we hide letters once they have been correctly guessed
        e.target.classList.add("hidden");
      } else {
        getElementById('stuff').classList.add('letter')
      }
      // player wins if they reach the end of the solution state, alphabetPosition
      if (alphabetPosition === letters.length - 1) {
        setTimerActive(false);
        setGameOver(true);
        setHasWon(true);
        // stop the timer
        setTimerActive(false);
        // send the users score (timeleft) and the word they solved to the database
        try {
          const { data } = addScore({
            variables: {
              game: letters.join("").toString(),
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

  // skeleton for shaking letter animation if choice is wrong
  // const runShake = () => {
  //   const [count, setCount] = React.useState(0)
  
  //   // Use useRef for mutable variables that we want to persist
  //   // without triggering a re-render on their change
  //   const requestRef = React.useRef();
  //   const previousTimeRef = React.useRef();
    
  //   const animate = time => {
  //     if (previousTimeRef.current != undefined) {
  //       const deltaTime = time - previousTimeRef.current;
        
  //       // Pass on a function to the setter of the state
  //       // to make sure we always have the latest state
  //       setCount(prevCount => (prevCount + deltaTime * 0.01) % 100);
  //     }
  //     previousTimeRef.current = time;
  //     requestRef.current = requestAnimationFrame(animate);
  //   }
    
  //   React.useEffect(() => {
  //     requestRef.current = requestAnimationFrame(animate);
  //     return () => cancelAnimationFrame(requestRef.current);
  //   }, []); // Make sure the effect runs only once
    
  //   return <div>{Math.round(count)}</div>
  
  // }

  function endgame() {
    useEffect(() => {
    if(hasWon) {
      document.getElementById("winloss").classList.add("win");
   
    } else if (gameOver && !hasWon) {
      document.getElementById("winloss").classList.add("lose");
  }})
  
  
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

  //  timer function based on real time
  function Timer() {
    useEffect(() => {
      // timer waits for timeractive state to become true to start
      if (timerActive === true) {
        // this timer works by taking the current time and counting away from it using a few states up above - Start (start time), Now (current time), Seconds (now-start)/1000, and Secondsleft (10-Seconds) (since it is a 10 second timer)
        const interval = setInterval(() => setNow(Date.now(), 1000));
        //  when out of time, we turn the timer off and set the gameover state to true
        if (secondsLeft <= 0) {
          console.log("out of time");
          setTimerActive(false);
          setGameOver(true);
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }
    });
    let time = 0+":"+secondsLeft;
    if (secondsLeft < 10) {
       time = 0+":"+0+secondsLeft;
    }
    // Seconds remaining display
    return <div className="time-cont"><div id="timer" className="clock">{time}</div></div>;
  }
  // showprompt function
  const showPrompt = async () => {
    setPromptHidden(false);
    // 5 second delay for players to see the prompt word
    await delay(5000);
    // hide word prompt
    setPromptHidden(true);
    // makes buttons clickable
    document.getElementById('prompt').classList.remove("events");
  };

  // start game function
  const playGameButton = async (event) => {
    event.preventDefault();
    // use the handleword function to pick a single word from the array
    const pickedWord = handleWord(words);
    // set letters to pickedWord, which will be used for the prompt
    setLetters(pickedWord);
    // hide instructions and playbutton
    document.getElementById("instructions").classList.add("hidden");
    document.getElementById("play").classList.add("hidden");
    // show word prompt then remove after 5 seconds
    await showPrompt();
    // activate game after show prompt, activate timer and shuffled letters for the displayed prompt
    setStart(Date.now());
    setTimerActive(true);
    setShuffleLetters(shuffled(pickedWord));
    setGameHidden(false);
  };

  return (
    <div className="t-cont">
      {!gameOver ? null :
      hasWon ? (<div className="banny">
      <h4 className="lvl-lbl">You won!</h4>
      <div>
        <button><Link to={playAgain} className="btn-l" onClick={() => window.location.reload()}>Play Again</Link></button>
        <button><Link to={nextGame} className="btn-l">Next Game</Link></button>
      </div>
    </div>) : ( <div className="banny">
          <h4 className="lvl-lbl">Game over</h4>
          <div>
            <button><Link to={playAgain} className="btn-l" onClick={() => window.location.reload()}>Play Again</Link></button>
            <button><Link to="/" className="btn-l">Home</Link></button>
          </div>
        </div>)}
      <div id="winloss" className="game-cont" endGame={endgame()}>
        
        {promptHidden ? null : (
          <div id="prompt" className="container events">
            {letters.map((letter) => (
              <Letter letter={letter} id="stuff" />
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
            <div id="lets" className="container">
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
