import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Mana from "./Mana";

function Deck(props) {
  const [deck, setDeck] = useState(null);
  // const [deckQuantity, setDeckQuantity] = useState(0);

  useEffect(() => {
    axios.get(`/api/decks/${props.match.params.name}/?format=json`).then((res) => {
      setDeck(res.data);
    });
  }, []);
  if (!deck) {
    return "loading";
  }

  const expandedCards = [];
  deck.cards.forEach((cardInDeck) => {
    {
      Array(cardInDeck.quantity)
        .fill(0)
        .forEach((n, i) => {
          expandedCards.push(cardInDeck);
        });
    }
  });
  console.log(expandedCards.length);
  const cardImagesInDeck = expandedCards.map((cardInDeck, t) => {
    return (
      <div
        key={t}
        className={"absolute h-32"}
        style={{ top: `${(t * 1) % 10}rem`, left: `${parseInt(t / 10) * 5.8}rem` }}
      >
        <Link to={`/card/${cardInDeck.card.slug}`}>
          <img className={" h-32 "} key={t} src={cardInDeck.card.image} alt="" />
        </Link>
      </div>
    );
  });
  const cardsInDeck = deck.cards.map((cardInDeck) => (
    <ul key={cardInDeck.card.id}>
      <li>
        <Link to={`/card/${cardInDeck.card.slug}`}>
          {cardInDeck.quantity} x {cardInDeck.card.name}
        </Link>
      </li>
    </ul>
  ));
  const manaProps = {};
  deck.color.forEach((color) => (manaProps[color] = 1));

  return (
    <div>
      <div>
        <Link to={`/deck/${deck.name}`}>{deck.name} </Link>
        <Mana {...manaProps} />

        <ul className={"relative"} style={{ height: "18rem" }}>
          {cardImagesInDeck}
        </ul>
        <ul className={""}>{cardsInDeck}</ul>
      </div>
      {expandedCards.length} cards in deck.
    </div>
  );
}

export default Deck;
