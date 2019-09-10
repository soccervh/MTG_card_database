import React from "react";
import WhiteMana from "./ManaTypes/WhiteMana";
import GreenMana from "./ManaTypes/GreenMana";
import RedMana from "./ManaTypes/RedMana";
import BlackMana from "./ManaTypes/BlackMana";
import BlueMana from "./ManaTypes/BlueMana";
import ColorlessMana from "./ManaTypes/ColorlessMana";

function Mana({ colorless = 0, red = 0, white = 0, blue = 0, black = 0, green = 0 }) {
  return (
    <div className={"mana"}>
      {colorless != 0 && <ColorlessMana amount={colorless} />}
      {Array(white)
        .fill(0)
        .map(() => (
          <WhiteMana />
        ))}
      {Array(blue)
        .fill(0)
        .map(() => (
          <BlueMana />
        ))}
      {Array(black)
        .fill(0)
        .map(() => (
          <BlackMana />
        ))}
      {Array(red)
        .fill(0)
        .map(() => (
          <RedMana />
        ))}
      {Array(green)
        .fill(0)
        .map(() => (
          <GreenMana></GreenMana>
        ))}
    </div>
  );
}

export default Mana;
