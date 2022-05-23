import React from "react";
import "./Header.css";
import eggLogo from "../assets/images/egglogo.jpg";

function Header() {
  return (
    <div className="container">
      {/* <img src={eggLogo} alt="Yellow cartoon egg logo." className="col-3"></img> */}
      <div>
        <h1 className=" col-6 logo">LETTER SCRAMBLE </h1>
        <p className="tag-line">Unscramble the letters to win!</p>
      </div>
      <img
        src={eggLogo}
        alt="Yellow cartoon egg logo."
        className="col-3 extra-icon"
      ></img>
    </div>
  );
}

export default Header;
