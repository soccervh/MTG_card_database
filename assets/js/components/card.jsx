import React, { useState } from "react";
// import "./Test.css";

const data = [
  {
    name: "Test Creature Card",
    id: 1,
    spell_type: "CR",
    abilities: "flying",
    text: "does something else.",
    flavor_text: "Flying high over the trees.",
    card_number: 1,
    artist: "Jason Lorenz",
  },
  {
    name: "Creature's name",
    id: 2,
    spell_type: "CR",
    abilities: "flying",
    text: "asdasffs",
    flavor_text: "asfasfasfsfsfa",
    card_number: 2,
    artist: "some magic artist",
  },
  {
    name: "sgsdg",
    id: 3,
    spell_type: "PL",
    abilities: "afsfa",
    text: "asfasf",
    flavor_text: "saffsa",
    card_number: 3,
    artist: "brandon",
  },
];

const singleCard = data[0];

export const CardList = (props = { data: [] }) => {
  return (
    <div>
      {/*TODO: Render all the cards  i.e.
      <Card name={namegoeshere} spellType={theSpellType} etc />

      props.data

      props.data.map( card => <Card name={card.name} .........   />
      */}
    </div>
  );
};

export const Card = (props = {}) => {
  const name = props.name;
  const id = props.id;
  const spellType = props.spellType;
  const abilities = props.abilities;
  const body = props.text;
  const flavorText = props.flavorText;
  const ardNumber = props.cardNumber;
  const artist = props.artist;
  return (
    <div>
      <h3>{name}</h3>
      <p>{spellType}</p>
      <p>{abilities}</p>
      <p>{body}</p>
      <p>{flavorText}</p>
      <p>{ardNumber}</p>
      <p>{artist}</p>
    </div>
  );
};

export const TestCard = (props) => {
  return (
    <Card
      name={singleCard.name}
      spellType={singleCard.spell_type}
      abilities={singleCard.abilities}
      text={singleCard.text}
      flavorText={singleCard.flavor_text}
      cardNumber={singleCard.card_number}
      artist={singleCard.artist}
    />
  );
};
