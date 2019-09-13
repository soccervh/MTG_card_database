import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DeckList() {
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/decks/?format=json").then((res) => {
      setDecks(res.data);
    });
  }, []);

  return (
    <div>
      <div>Decks</div>
      <div>
        <ul>
          {decks.map((deck) => (
            <Link key={deck.id} to={`/deck/${deck.name}`}>
              <li>{deck.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DeckList;
