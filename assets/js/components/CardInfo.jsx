import React, { useState, useEffect } from "react";
import axios from "axios";
import BlackMana from "./ManaTypes/BlackMana.jsx";
import GreenMana from "./ManaTypes/GreenMana";
import RedMana from "./ManaTypes/RedMana";
import BlueMana from "./ManaTypes/BlueMana";
import WhiteMana from "./ManaTypes/WhiteMana";
import Mana from "./Mana";
import { Link } from "react-router-dom";

function CardInfo(props) {
  const [cardInfo, setCardInfo] = useState({});
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/cards/${props.match.params.slug}/?format=json`)
      .then((res) => {
        setCardInfo(res.data);
      });
  }, []);
  if (!cardInfo.name) return "Loading";
  let legendary = "";
  if (cardInfo.is_legendary) {
    legendary = "Legendary ";
  }
  const manaProps = {};
  cardInfo.mana.forEach((manaObject) => {
    manaProps[manaObject.mana.name] = manaObject.quantity;
  });
  return (
    <div className={"cardInfo-container"}>
      <img className={"image"} src={cardInfo.image} alt="" />

      <div className={"cardInfo-cardInformation"}>
        <p className={"icons"}>
          {cardInfo.name}
          <Mana {...manaProps} />
        </p>

        <p className={"spell-type"}>
          {legendary}
          {cardInfo.spell_type} - {cardInfo.creature_type}
        </p>
        <p className={"abilities"}>{cardInfo.abilities}</p>
        <p className={"text"} dangerouslySetInnerHTML={{ __html: cardInfo.text }}></p>
        <p className={"flavor"}>
          <i>{cardInfo.flavor_text}</i>
        </p>
        <p className={"card-number"}>Card - {cardInfo.card_number}</p>
        <p className={"artist"}>Artist - {cardInfo.artist}</p>
      </div>
      <Link to={`/card-update/${cardInfo.slug}`}>Update</Link>
    </div>
  );
}

export default CardInfo;
