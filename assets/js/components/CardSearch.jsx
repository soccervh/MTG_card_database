import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useReactRouter from "use-react-router";
import queryString from "query-string";
import { Field, Formik } from "formik";
import { Debug } from "./DebugFormik";

function CardSearch(props) {
  const [cardName, setCardName] = useState([]);
  const { history, location, match } = useReactRouter();
  const values = queryString.parse(location.search);
  console.log(values);
  const manaColors = [
    { color: "colorless", value: values.colorless },
    { color: "white", value: values.white },
    { color: "blue", value: values.blue },
    { color: "black", value: values.black },
    { color: "red", value: values.red },
    { color: "green", value: values.green },
  ];
  let query = "?format=json";
  if (values.name) query += `&name=${values.name}`;
  manaColors.forEach((manaColor) => {
    if (manaColor.value) query += `&${manaColor.color}=1`;
  });
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/cards/${query}`).then((res) => {
      setCardName(res.data);
    });
  }, [query]);

  return (
    <div>
      <Formik
        initialValues={{
          name: values.name ? values.name : "",
          colorless: values.colorless ? true : false,
          white: values.white ? true : false,
          blue: values.blue ? true : false,
          black: values.black ? true : false,
          red: values.red ? true : false,
          green: values.green ? true : false,
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
          setFieldValue,
        }) => {
          const listColors = manaColors.map((manaColor) => {
            return (
              <div className={"p-2"} key={manaColor.color}>
                <Field
                  className={"mr-1"}
                  checked={values[manaColor.color]}
                  type="checkbox"
                  name={manaColor.color}
                />
                {manaColor.color}
              </div>
            );
          });
          return (
            <div>
              <form className={"bg-blue-100 flex items-center "}>
                <Field name="name" type="text" className="search-input" placeholder="Card Search" />
                {listColors}
                <button
                  className={"p-4 bg-blue-400 text-gray-300 tracking-wider "}
                  onClick={(e) => {
                    let newQuery = "?";
                    if (values.name) newQuery += `&name=${values.name}`;
                    manaColors.forEach((manaColor) => {
                      if (values[manaColor.color]) newQuery += `&${manaColor.color}=1`;
                    });
                    e.preventDefault();
                    console.log(history);
                    history.push(`/cardSearch${newQuery}`);
                  }}
                >
                  search
                </button>
              </form>
              {/*<Debug />*/}
            </div>
          );
        }}
      </Formik>

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
