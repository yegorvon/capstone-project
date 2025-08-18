import React from "react";
import logo from "../assets/little-lemon-logo.png"; // put your logo here

function Header() {
  return (
    <header>
      <a href="/" className="site-brand" aria-label="Little Lemon Home">
        <img src={logo} alt="Little Lemon restaurant logo" width="160" height="48" />
      </a>
    </header>
  );
}

export default Header;
