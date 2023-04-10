import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const handleUnload = () => {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    };
    window.addEventListener('unload', handleUnload);
    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (!name || !number) {
      alert('Please provide both name and number');
      return;
    }

    const isNameExist = contacts.some(contact => contact.name === name);
    const isNumberExist = contacts.some(contact => contact.number === number);

    if (isNameExist) {
      alert(`${name} is already in contacts!`);
      return;
    }
    if (isNumberExist) {
      alert(`${number} is already in contacts!`);
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

  return { contacts, addContact, deleteContact };
};

export default useContacts;
