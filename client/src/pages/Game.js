import React, { useState } from "react";

//
function Game() {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);

  const alphabet = alpha.map((x) => String.fromCharCode(x));
  console.log(alphabet);

  const [shuffleLetters, setShuffleLetters] = useState(alphabet);
  // code used from arrayOfAlphabet.js from github

  const handleCardClick = (letter) => {
    //  when a card is clicked, this is what goes here
    console.log(letter);
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

  const playGameButton = async (event) => {
    event.preventDefault();
    // setting state
    setShuffleLetters(shuffled(alphabet));
  };

  // WHEN game starts, display alphabet cards when game begins for 5 seconds, then letters disapear, then display alphabet out of order at bottom

  //
  // const SearchBooks = () => {
  //   // use to store scores
  //   const [searchedBooks, setSearchedBooks] = useState([]);

  //   // save scoreId
  //   const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  //   const [saveBook, { error }] = useMutation(SAVE_BOOK);

  //   // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  //   // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  //   useEffect(() => {
  //     return () => saveBookIds(savedBookIds);
  //   });

  return (
    <div>
      {shuffleLetters}
      {shuffleLetters.map((letter) => (
        <div
          onClick={() => handleCardClick(letter)}
          key={letter}
          style={{
            width: "100px",
            height: "100px",
            textAlign: "center",
            background: "red",
          }}
        >
          {letter}
        </div>
      ))}
      <button onClick={playGameButton}>Play!</button>;
    </div>
  );

  // WHEN user clicks correct letter the letter will appear in its place
  //IF the user chooses the wrong letter, MODAL (visual component along with text, targeting non-readers/users) will appear indicating the user has chosen incorrectly.
  // WHEN the user finishes the entire alphabet, in the correct order, the user is shown a video to reenforce what they just learned.
  // DISPLAY Stats to track after each completed game. (Ideas: time, accuracy)
  // WHEN user finishes the game, user is prompted to either play again or return to profile page. (LATER: can move to the next letter)
}
export default Game;
