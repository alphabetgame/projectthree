import React from "react";
import "./Header.css";
import eggLogo from "../assets/images/egglogo.jpg";

function Header() {
  return (
    <header className="">
      <h1 className="logo">
        <img src={eggLogo} alt="Yellow cartoon egg logo."></img>
        LETTER SCRAMBLE
        <img src={eggLogo} alt="Yellow cartoon egg logo."></img>
      </h1>
      <p className="tag-line">Unscramble the letters to win!</p>
    </header>
  );
}

export default Header;
