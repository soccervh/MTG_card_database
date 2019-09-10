import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Card } from "./components/card.jsx";
import { TestCard } from "./components/card.jsx";
import { Test } from "./playground/todo-test.jsx";
import { Counter } from "./playground/counter.jsx";
import { NoteApp } from "./playground/note-app.jsx";
import CardList from "./components/CardList.jsx";
import CardInfo from "./components/CardInfo.jsx";
import NavBar from "./components/navbar.jsx";
import "../scss/base.scss";
import NavBar1 from "./components/NavBar1.jsx";
import ContactPage from "./components/Contact.jsx";
import HomeSwitch from "./components/Switch.jsx";

const App = () => (
  <BrowserRouter>
    <NavBar1 />
    {/*<Card />*/}
    {/*<TestCard />*/}
    {/*<Test />*/}
    {/*<Counter count={2} />*/}
    {/*<NoteApp />*/}
    <HomeSwitch />
  </BrowserRouter>
);

export default App;
