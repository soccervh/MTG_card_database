import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

function CardList() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/cards/?format=json").then((res) => {
      setCards(res.data);
    });
  }, []);
  return (
    <div className={"cardlist-container"}>
      <div className={"cardlist-left"}>
        <ul>
          {cards.map((card) => (
            <Link key={card.id} to={`/card/${card.slug}`}>
              <li>{card.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <ul className={"cardlist-right"}>
        {cards
          .filter((card) => card.image)
          .map((card) => (
            <li key={card.id}>
              <Link to={`/card/${card.slug}`}>
                <img src={card.image} alt="" />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CardList;
