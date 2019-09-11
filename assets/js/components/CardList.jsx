import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

function CardList() {
  const [cardName, setCardName] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/cards/?format=json").then((res) => {
      setCardName(res.data);
    });
  }, []);
  return (
    <div className={"cardlist-container"}>
      <div className={"cardlist-left"}>
        <ul>
          {cardName.map((cardName) => (
            <Link key={cardName.id} to={`/card/${cardName.slug}`}>
              <li>{cardName.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <ul className={"cardlist-right"}>
        {cardName
          .filter((cardName) => cardName.image)
          .map((cardName) => (
            <li key={cardName.id}>
              <Link to={`/card/${cardName.slug}`}>
                <img src={cardName.image} alt="" />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CardList;
