import React, { useState, useRef } from 'react';
import useContacts from './Helper/useContacts';
import useFilter from './Helper/useFilter';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import css from '../App.module.css';

function App() {
  const [formValues, setFormValues] = useState({ name: '', number: '' });
  const nameInput = useRef(null);
  const { contacts, addContact, deleteContact } = useContacts();
  const { filter, handleFilterChange } = useFilter();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.App}>
      <h1>Phonebook</h1>
      <ContactForm
        onSubmit={addContact}
        onInputChange={handleInputChange}
        formValues={formValues}
        nameInput={nameInput}
      />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

export default App;
