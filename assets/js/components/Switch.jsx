import React from "react";
import ContactPage from "./Contact.jsx";
import CardList from "./CardList.jsx";
import CardInfo from "./CardInfo.jsx";
import { Counter } from "../playground/counter.jsx";
import { Link, Route, Switch } from "react-router-dom";
import CardSearch from "./CardSearch";
import DeckBuilder from "./DeckBuilder";
import DeckList from "./DeckList";
import Deck from "./Deck";
import CardCreator from "./CardCreator";
import CardUpdate from "./CardUpdate";
function HomeSwitch() {
  const NotFoundPage = () => (
    <div>
      404 - <Link to={"/"}>Go Home</Link>
    </div>
  );
  return (
    <Switch>
      <Route path={"/contact"} component={ContactPage} exact={true} />
      <Route path={"/"} component={CardList} exact={true} />
      <Route path={"/card/:slug"} component={CardInfo} exact={true} />
      <Route path={"/card-update/:slug"} component={CardUpdate} exact={true} />
      <Route path={"/c"} component={Counter} exact={true} />
      <Route path={"/cardSearch"} component={CardSearch} exact={true} />
      <Route path={"/card-creator"} component={CardCreator} exact={true} />
      <Route path={"/deck-builder"} component={DeckBuilder} exact={true} />
      <Route path={"/decks"} component={DeckList} exact={true} />
      <Route path={"/deck/:name"} component={Deck} exact={true} />
      <Route component={NotFoundPage} />
      <Link to={"/"}>Go Home</Link>
      <Link to={"/cardinfo"}>Go cardinfo</Link>
      <Link to={"/c"}>Go c</Link>
    </Switch>
  );
}

export default HomeSwitch;
