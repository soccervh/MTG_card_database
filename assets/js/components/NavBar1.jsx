import React from "react";
import { Link } from "react-router-dom";
import useReactRouter from "use-react-router";
import classNames from "classnames";

function NavBar1() {
  const { history, location, match } = useReactRouter();
  console.log(location);
  // const pathname = location("pathname");
  return (
    <nav className={"nav-bar1"}>
      <ul className={"nav-links"}>
        <li
          className={classNames({
            "nav-button": true,
            active: location.pathname === "/",
          })}
        >
          <Link to={"/"}>Home</Link>
        </li>
        <li
          className={classNames({
            "nav-button": true,
            active: location.pathname === "/cards",
          })}
        >
          <Link to={"/cards"}>Cards</Link>
        </li>
        <li className="nav-button">
          <Link to={"/decks"}>Decks</Link>
        </li>
        <li className="nav-button">
          <Link to={"/deck-builder"}>Deck Builder</Link>
        </li>
        <li
          className={classNames({
            "nav-button": true,
            active: location.pathname === "/contact",
          })}
        >
          <Link to={"/contact"}>Contact</Link>
        </li>
        {/*<li className="nav-button nav-search">*/}
        {/*  <input type="text" className="search-input" placeholder="Card Search" />*/}
        {/*</li>*/}
        <li
          className={classNames({
            "nav-button": true,
            active: location.pathname === "/cardSearch",
          })}
        >
          <Link to={"/cardSearch"}>Search</Link>
        </li>
        <li className="nav-button">Logout</li>
      </ul>
    </nav>
  );
}

export default NavBar1;
