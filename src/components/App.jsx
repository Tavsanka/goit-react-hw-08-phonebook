import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import {
  fetchContacts,
  addContact,
  deleteContact,
} from "../redux/features/contacts/contactSlice";
import { setFilter } from "../redux/features/filter/filterSlice";
import "./App.scss";

const App = () => {
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = ({ name, number }) => {
    const duplicateContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase(),
    );

    if (duplicateContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact({ name, number }));
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
