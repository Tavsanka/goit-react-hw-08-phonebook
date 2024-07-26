import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ContactForm.scss";

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "number") {
      setNumber(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    if (!phonePattern.test(number)) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    setErrorMessage("");
    onSubmit({ name, number });
    setName("");
    setNumber("");
  };

  return (
    <form className={"form"} onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Name"
        required
        autoComplete="name"
      />
      <label htmlFor="number">Phone number</label>
      <input
        id="number"
        type="tel"
        name="number"
        value={number}
        pattern="^\+?[1-9]\d{1,14}$"
        onChange={handleChange}
        placeholder="Phone number"
        required
        autoComplete="tel"
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
