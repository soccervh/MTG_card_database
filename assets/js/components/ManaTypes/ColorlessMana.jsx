import React from "react";

function ColorlessMana({ amount = 0 }) {
  const displayNumber = amount === -1 ? "X" : amount;
  return <div className={"colorless-mana"}>{displayNumber}</div>;
}
export default ColorlessMana;
