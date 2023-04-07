import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import css from '../App.module.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [storedFilter, setStoredFilter] = useState('');
  const [formValues, setFormValues] = useState({ name: '', number: '' });
  const [loading, setLoading] = useState(true);
  const nameInput = useRef(null);

  useEffect(() => {
    const contactsFromStorage = localStorage.getItem('contacts');
    if (contactsFromStorage) {
      setContacts(JSON.parse(contactsFromStorage));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts, loading]);

  useEffect(() => {
    const storedFilter = localStorage.getItem('filter');
    if (storedFilter) {
      setFilter(storedFilter);
      setStoredFilter(storedFilter);
    }
  }, []);

  useEffect(() => {
    if (filter !== storedFilter) {
      localStorage.setItem('filter', filter);
      setStoredFilter(filter);
    }
  }, [filter, storedFilter]);

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const addContact = ({ name, number }) => {
    const isNameExist = contacts.some(contact => contact.name === name);

    if (isNameExist) {
      alert(`${name} is already in contacts`);
      nameInput.current.focus();
      return;
    }

    const id = uuidv4();
    const newContact = { id, name, number };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
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
