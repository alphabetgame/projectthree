// WHEN user clicks correct letter the letter will appear in its place
//IF the user chooses the wrong letter, MODAL (visual component along with text, targeting non-readers/users) will appear indicating the user has chosen incorrectly.
// WHEN the user finishes the entire alphabet, in the correct order, the user is shown a video to reenforce what they just learned.
// DISPLAY Stats to track after each completed game. (Ideas: time, accuracy)
// WHEN user finishes the game, user is prompted to either play again or return to profile page. (LATER: can move to the next letter)

import React, { useState, useEffect } from "react";
import "../components/LetterCard.css";
import "../components/Game.css";
//import Timer from "../components/Timer";
import { QUERY_GAMES } from "../utils/query";
import { useQuery } from "@apollo/client";

function Gametwo() {
  // code used from arrayOfAlphabet.js from github

  const { loading, data } = useQuery(QUERY_GAMES);
  const letters = data?.games[0].solution.split("") || [];

  const [shuffleLetters, setShuffleLetters] = useState([]);

  const [alphabetPosition, setAlphabetPosition] = useState(0);
  // const [timerActive, setTimerActive] = useState(false);
  const [seconds, setSeconds] = useState(10);
  const [timerActive, setTimerActive] = useState(false);
  // const [timeRemaining, setTimeRemaining] = useState(10);
  // code used from arrayOfAlphabet.js from github

  console.log(letters);

  const handleCardClick = (letter) => {
    //  when a card is clicked, this is what goes here

    if (letter === letters[alphabetPosition]) {
      const newPosition = alphabetPosition + 1;
      setAlphabetPosition(newPosition);
    }
    if (alphabetPosition === letters.length - 1) {
      console.log("game over");
    }
    //set to default state once game over

    console.log(letter);

    //if statement that checks whether the user chose correctly or not
  };

  //   shuffle letters
  const shuffled = (letters) =>
    letters
      .map((value) => ({
        value,
        sort: Math.random(),
      }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

  useEffect(() => {
    if (timerActive === true) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        }
      }, 1000);
      if (seconds <= 0) {
        console.log("out of time");
        setTimerActive(false);
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  });

  const playGameButton = async (event) => {
    event.preventDefault();
    //activate timer
    //setTimerActive(true);
    // call timer function
    setTimerActive(true);
    // setting state
    setShuffleLetters(shuffled(letters));
  };
  const handleIsActive = () => {};
  // WHEN game starts, display alphabet cards when game begins for 5 seconds, then letters disapear, then display alphabet out of order at bottom

  return (
    <div>
      <div>You have {seconds} seconds remaining</div>
      {shuffleLetters}
      {shuffleLetters.map((letter) => (
        <div
          onClick={() => handleCardClick(letter)}
          key={letter}
          className="card"
        >
          {letter}
        </div>
      ))}
      <button onClick={playGameButton}>Play!</button>;
    </div>
  );
}
export default Gametwo;
