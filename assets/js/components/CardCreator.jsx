import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
import ImageUploader from "react-images-upload";
function CardCreator() {
  const [mana, setMana] = useState([]);
  const [image, setImage] = useState(null);
  useEffect(() => {
    axios.get(`/api/mana`).then((res) => {
      setMana(res.data);
    });
  }, []);
  console.log(image);
  return (
    <Formik
      initialValues={{
        name: "",
        expansion: "ELD",
        is_legendary: "",
        spell_type: "Creature",
        card_number: "",
        creature_type: "dsfdsf",
        abilities: "sdfdsf",
        text: "dfsdf",
        flavor_text: "dsfdsf",
        power: "2",
        defense: "2",
        loyalty: "2",
        artist: "afaf",
      }}
      onSubmit={(values) => {
        const cardCreatorInfo = {
          ...values,
          is_legendary: values.is_legendary === "Yes",
          file: values.image[0],
        };
        const formData = new FormData();
        for (const i of Object.keys(cardCreatorInfo)) {
          formData.append(i, cardCreatorInfo[i]);
        }
        console.log(formData);
        debugger;
        axios.post(`/api/card-create`, formData).then((res) => {
          console.log(res);
        });
      }}
      render={({
        values,
        setFieldValue,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          method="POST"
          className={"card-creator-form"}
          onSubmit={handleSubmit}
          encType={"multipart/form-data"}
        >
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
          </select>{" "}
          <div>Image</div>
          <ImageUploader
            buttonText={"Choose Card"}
            withPreview={true}
            singleImage={true}
            onChange={(pictures) => {
              setFieldValue("image", pictures);
            }}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
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
                  name={`mana_${m.name}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[`mana_${m.name}`]}
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

export default CardCreator;
