import React, { useState, useEffect } from "react";
import axios from "axios";
import BlackMana from "./ManaTypes/BlackMana.jsx";
import GreenMana from "./ManaTypes/GreenMana";
import RedMana from "./ManaTypes/RedMana";
import BlueMana from "./ManaTypes/BlueMana";
import WhiteMana from "./ManaTypes/WhiteMana";
import Mana from "./Mana";

function CardInfo(props) {
  const [cardInfo, setCardInfo] = useState([]);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/cards/${props.match.params.slug}/?format=json`)
      .then((res) => {
        setCardInfo(res.data);
      });
  }, []);
  return (
    <div className={"cardInfo-container"}>
      <img className={"image"} src={cardInfo.image} alt="" />

      <div className={"cardInfo-cardInformation"}>
        <div className={"name-mana"}>
          <p className={"name"}>{cardInfo.name}</p>
          <div className="icons">
            <Mana
              colorless={cardInfo.mana_colorless}
              white={cardInfo.mana_white}
              blue={cardInfo.mana_blue}
              black={cardInfo.mana_black}
              red={cardInfo.mana_red}
              green={cardInfo.mana_green}
            />
          </div>
        </div>
        <p className={"spell-type"}>{cardInfo.spell_type}</p>
        <p className={"abilities"}>{cardInfo.abilities}</p>
        <p className={"text"} dangerouslySetInnerHTML={{ __html: cardInfo.text }}></p>
        <p className={"flavor"}>{cardInfo.flavor_text}</p>
        <p className={"card-number"}>Card - {cardInfo.card_number}</p>
        <p className={"artist"}>Artist - {cardInfo.artist}</p>
      </div>
    </div>
  );
}

export default CardInfo;
