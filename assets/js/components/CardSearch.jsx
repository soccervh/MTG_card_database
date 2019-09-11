import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useReactRouter from "use-react-router";
import queryString from "query-string";

function CardSearch(props) {
  const [cardName, setCardName] = useState([]);
  const { history, location, match } = useReactRouter();
  const values = queryString.parse(location.search);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/cards/?name=${values.name}&format=json`).then((res) => {
      setCardName(res.data);
    });
  }, []);

  return (
    <div>
      <form>
        <input name="name" type="text" className="search-input" placeholder="Card Search" />
        <button>search</button>
      </form>
      <div>
        <ul className={"cardlist-right"}>
          {cardName
            .filter((cardName) => cardName.image)
            .map((cardName) => (
              <li key={cardName.id}>
                <Link to={`/card/${cardName.slug}`}>
                  <img src={cardName.image} alt="" />
                  <div className={"search-name"} key={cardName.id}>
                    {cardName.name}
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default CardSearch;
