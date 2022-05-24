import React, { useState } from "react";
import "./LetterAnimations.css";

function Letter(props) {
  const [animation] = useState(props.animation);
  const { letter, handleCardClick } = props;
  console.log(animation);
  return (
    <div
      onClick={(e) => {
        handleCardClick(e, letter);
      }}
      key={letter}
      className={`card ${animation}`}
      id="card"
    >
      {letter}
    </div>
  );
}
export default Letter;
