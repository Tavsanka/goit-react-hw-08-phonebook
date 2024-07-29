import React from "react";
import PropTypes from "prop-types";
import "./ContactItem.scss";

const ContactItem = ({ id, name, number, onDeleteContact, onEditContact }) => (
  <li className={"contact-item"}>
    <span className={"contact-name"}>{name}</span>
    <span className={"contact-number"}>{number}</span>
    <button
      className={"edit-button"}
      onClick={() => onEditContact({ id, name, number })}>
      Edit
    </button>
    <button className={"delete-button"} onClick={() => onDeleteContact(id)}>
      Delete
    </button>
  </li>
);

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  onEditContact: PropTypes.func.isRequired,
};

export default ContactItem;
