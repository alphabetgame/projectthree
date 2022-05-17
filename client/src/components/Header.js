import React from "react";
import eggLogo from "../assets/images/egglogo.jpg";

function Header() {
  return (
    <div>
      <h1>
        <img src={eggLogo} alt="Yellow cartoon egg logo."></img>
        Letter Scramble
      </h1>
    </div>
  );
}

export default Header;
