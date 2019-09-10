import React from "react";
import { Link } from "react-router-dom";

function NavBar1() {
  return (
    <nav className={"nav-bar1"}>
      <ul className={"nav-links"}>
        <li className="nav-button">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="nav-button">
          <Link to={"/cards"}>Cards</Link>
        </li>
        <li className="nav-button">
          <Link to={"/about"}>About</Link>
        </li>
        <li className="nav-button">
          <Link to={"/contact"}>Contact</Link>
        </li>
        <li className="nav-button nav-search">
          <input type="text" className="search-input" placeholder="Search" />
        </li>
        <li className="nav-button">Logout</li>
      </ul>
    </nav>
  );
}

export default NavBar1;
