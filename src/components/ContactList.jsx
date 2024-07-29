import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  deleteContact,
  updateContact,
} from "../redux/features/contacts/contactSlice";
import ContactItem from "./ContactItem";
import "./ContactList.scss";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);
  const token = useSelector((state) => state.auth.token);
  const [editingContact, setEditingContact] = useState(null);
  const [updatedContact, setUpdatedContact] = useState({
    name: "",
    number: "",
  });

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact({ id: contactId, token }));
  };

  const handleUpdateContact = (contact) => {
    setEditingContact(contact);
    setUpdatedContact({ name: contact.name, number: contact.number });
  };

  const handleSaveUpdate = (id) => {
    dispatch(updateContact({ id, contact: updatedContact, token }));
    setEditingContact(null);
  };

  const handleChange = (e) => {
    setUpdatedContact({ ...updatedContact, [e.target.name]: e.target.value });
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <ul className={"list"}>
      {filteredContacts.map((contact) => (
        <li key={contact.id}>
          {editingContact && editingContact.id === contact.id ? (
            <>
              <input
                type="text"
                name="name"
                value={updatedContact.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="number"
                value={updatedContact.number}
                onChange={handleChange}
              />
              <button onClick={() => handleSaveUpdate(contact.id)}>Save</button>
              <button onClick={() => setEditingContact(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span>{contact.name}</span>
              <span>{contact.number}</span>
              <button onClick={() => handleUpdateContact(contact)}>Edit</button>
              <button onClick={() => handleDeleteContact(contact.id)}>
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
