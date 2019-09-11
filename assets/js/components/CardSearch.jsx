import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useReactRouter from "use-react-router";
import queryString from "query-string";

function CardSearch(props) {
  const [cardName, setCardName] = useState([]);
  const { history, location, match } = useReactRouter();
  const values = queryString.parse(location.search);
  const manaColors = [
    { color: "colorless", value: values.colorless },
    { color: "white", value: values.white },
    { color: "blue", value: values.blue },
    { color: "black", value: values.black },
    { color: "red", value: values.red },
    { color: "green", value: values.green },
  ];
  useEffect(() => {
    let query = "?format=json";
    if (values.name) query += `&name=${values.name}`;
    manaColors.forEach((manaColor) => {
      if (manaColor.value) query += `&${manaColor.color}=1`;
    });
    axios.get(`http://127.0.0.1:8000/api/cards/${query}`).then((res) => {
      setCardName(res.data);
    });
  }, []);

  const listColors = manaColors.map((manaColor) => {
    return (
      <div key={manaColor.color}>
        <input type="checkbox" name={manaColor.color} defaultChecked={manaColor.value} />
        {manaColor.color}
      </div>
    );
  });
  return (
    <div>
      <form className={"bg-blue-100 flex items-center "}>
        <input
          name="name"
          type="text"
          className="search-input"
          placeholder="Card Search"
          defaultValue={values.name}
        />
        {listColors}
        <button className={"p-4 bg-blue-400 text-gray-300 tracking-wider "}>search</button>
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
