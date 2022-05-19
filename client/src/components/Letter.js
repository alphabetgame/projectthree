import React from "react";

function Letter(props) {
  const { letter, handleCardClick } = props;
  return (
    <div
      onClick={(e) => {
        handleCardClick(e, letter);
      }}
      key={letter}
      className="card"
    >
      {letter}
    </div>
  );
}
export default Letter;
