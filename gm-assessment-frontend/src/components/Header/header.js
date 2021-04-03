import React from "react";
import "./stylesheet/header.scss";
import logo from "../../assets/gm-logo.png";

export default function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Giant Machines"
      />
    </header>
  );
}
