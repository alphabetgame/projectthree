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

function Gametwo(props) {
  const { level } = props;
  const { loading, data } = useQuery(QUERY_GAMES);
  console.log(data);
  const words = data?.games[level].solution.split(",") || [];

  const [letters, setLetters] = useState([]);
  const [shuffleLetters, setShuffleLetters] = useState([]);
  const [alphabetPosition, setAlphabetPosition] = useState(0);

  // new timer stuff
  const [start, setStart] = useState();
  const [now, setNow] = useState(start);
  const seconds = Math.floor((now - start) / 1000);
  const secondsLeft = 10 - seconds;
  const [timerActive, setTimerActive] = useState(false);
  const [timerHidden, setTimerHidden] = useState(true);
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
    document.getElementById("prompt").classList.remove("hidden");
    await delay(5000);
    // console.log("waited 5 seconds");
    // hide word prompt
    document.getElementById("prompt").classList.add("hidden");
  };

  // start game function
  const playGameButton = async (event) => {
    event.preventDefault();
    const pickedWord = handleWord(words);
    console.log("words", words);
    setLetters(pickedWord);
    // hide instructions
    document.getElementById("instructions").classList.add("hidden");
    // show word prompt then remove
    await showPrompt();
    // activate game after show prompt, timer and shuffled letters
    setStart(Date.now());
    setTimerActive(true);
    setShuffleLetters(shuffled(pickedWord));
    setTimerHidden(false);
  };

  // WHEN game starts, display alphabet cards when game begins for 5 seconds, then letters disapear, then display alphabet out of order at bottom

  return (
    <div>
      <div id="instructions" className="">
        When you hit the Play Game button a word will be displayed for 5
        seconds. Its letters will then get scrambled, and you'll have 10 seconds
        to spell it correctly!
      </div>
      <div id="prompt" className="hidden container">
        {letters.map((letter) => (
          <Letter letter={letter} />
        ))}
      </div>
      {timerHidden ? null : <Timer />}
      <div className="container">
        {shuffleLetters.map((letter) => (
          <Letter letter={letter} handleCardClick={handleCardClick} />
        ))}
      </div>
      <button onClick={playGameButton}>Play!</button>
    </div>
  );
}
export default Gametwo;
