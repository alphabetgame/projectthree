import React from "react";

//
export default function alphabetGame() {
  // code used from arrayOfAlphabet.js from github
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  console.log(alphabet);
  const start = (
    <li>
      <button>Play</button>
    </li>
  );
  //   shuffle letters
  const shuffled = alphabet
    .map((value) => ({
      value,
      sort: Math.random(),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  // WHEN game starts, display alphabet cards when game begins for 5 seconds, then letters disapear, then display alphabet out of order at bottom

  const startGame = () => {};

  // WHEN user clicks correct letter the letter will appear in its place
  //IF the user chooses the wrong letter, MODAL (visual component along with text, targeting non-readers/users) will appear indicating the user has chosen incorrectly.
  // WHEN the user finishes the entire alphabet, in the correct order, the user is shown a video to reenforce what they just learned.
  // DISPLAY Stats to track after each completed game. (Ideas: time, accuracy)
  // WHEN user finishes the game, user is prompted to either play again or return to profile page. (LATER: can move to the next letter)
}
