import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
function CardUpdate(props) {
  const [cardInfo, setCardInfo] = useState({});
  useEffect(() => {
    axios.get(`/api/cards/${props.match.params.slug}/?format=json`).then((res) => {
      setCardInfo(res.data);
    });
  }, []);
  const [mana, setMana] = useState([]);
  useEffect(() => {
    axios.get(`/api/mana/`).then((res) => {
      setMana(res.data);
    });
  }, []);
  if (!cardInfo.name || mana.length === 0) return "Loading";

  return (
    <Formik
      initialValues={{
        name: cardInfo.name,
        expansion: cardInfo.expansion,
        id: cardInfo.id,
        mana: {},
        is_legendary: cardInfo.is_legendary,
        spell_type: cardInfo.spell_type,
        card_number: cardInfo.card_number,
        creature_type: cardInfo.creature_type,
        abilities: cardInfo.abilities,
        text: cardInfo.text,
        flavor_text: cardInfo.flavor_text,
        power: cardInfo.power,
        defense: cardInfo.defense,
        loyalty: cardInfo.loyalty,
        artist: cardInfo.artist,
      }}
      onSubmit={(values) => {
        const cardCreatorInfo = {
          ...values,
          is_legendary: values.is_legendary === "Yes",
        };
        axios.post(`/api/card-update`, cardCreatorInfo).then((res) => {
          console.log(res);
        });
      }}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form method="POST" className={"card-creator-form"} onSubmit={handleSubmit}>
          <span>Name</span>
          <input
            type={"text"}
            name={"name"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          <span>Expansion</span>
          <select
            name="expansion"
            id=""
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.expansion}
          >
            <option value="Expansion">Throne of Eldraine (ELD)</option>
          </select>
          <span>Is Legendary</span>
          <select
            name="is_legendary"
            id=""
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.is_legendary}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>

          {mana.map((m) => {
            return (
              <React.Fragment>
                <span>{m.name}</span>
                <input
                  type="number"
                  defaultValue={0}
                  name={`mana.${m.name}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[`mana.${m.name}`]}
                />
              </React.Fragment>
            );
          })}
          <span>Spell Type</span>
          <select
            name="spell_type"
            id=""
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.spell_type}
          >
            <option value="Creature">Creature</option>
            <option value="Planeswalker">Planeswalker</option>
            <option value="Instant">Instant</option>
            <option value="Sorcery">Sorcery</option>
            <option value="Enchantment">Enchantment</option>
            <option value="Artifact">Artifact</option>
            <option value="Artifact Creature">Artifact Creature</option>
            <option value="Land">Land</option>
          </select>
          <span>Card Number</span>
          <input
            type="number"
            name={"card_number"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.card_number}
          />
          <span>Creature Type</span>
          <input
            type="text"
            name={"creature_type"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.creature_type}
          />
          <span>Abilities</span>
          <input
            type="text"
            name={"abilities"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.abilities}
          />
          <span>Text</span>
          <textarea name={"text"} onChange={handleChange} onBlur={handleBlur} value={values.text} />
          <span>Flavor Text</span>
          <textarea
            name={"flavor_text"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.flavor_text}
          />
          <span>Power</span>
          <input
            type={"number"}
            name={"power"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.power}
          />
          <span>Defense</span>
          <input
            type={"number"}
            name={"defense"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.defense}
          />
          <span>Loyalty</span>
          <input
            type={"number"}
            name={"loyalty"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.loyalty}
          />
          <span>Artist</span>
          <input
            type={"text"}
            name={"artist"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.artist}
          />
          <button type={"submit"} disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    />
  );
}

export default CardUpdate;
