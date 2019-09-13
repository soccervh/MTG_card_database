import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Deck(props) {
  const [deck, setDeck] = useState(null);
  useEffect(() => {
    axios.get(`/api/decks/${props.match.params.name}/?format=json`).then((res) => {
      setDeck(res.data);
    });
  }, []);
  if (!deck) {
    return "loading";
  }
  const cardsInDeck = deck.cards.map((cardInDeck) => (
    <ul key={cardInDeck.card.id}>
      <li>
        <Link to={`/card/${cardInDeck.card.slug}`}>
          {cardInDeck.card.name} x {cardInDeck.quantity}
        </Link>
      </li>
      <li className={"card-images"}>
        <Link to={`/card/${cardInDeck.card.slug}`}>
          {Array(cardInDeck.quantity)
            .fill(0)
            .map((n, i) => {
              return (
                <img
                  key={i}
                  style={{ left: i * 15 }}
                  width={50}
                  src={cardInDeck.card.image}
                  alt=""
                />
              );
            })}
        </Link>
      </li>
    </ul>
  ));
  return (
    <div>
      <div>testing deck list</div>

      <ul>
        <React.Fragment key={deck.id}>
          <Link to={`/deck/${deck.name}`}>{deck.name}</Link>
          <ul className={"deck"}>{cardsInDeck}</ul>
        </React.Fragment>
      </ul>
    </div>
  );
}

export default Deck;
