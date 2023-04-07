import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import css from '../App.module.css';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsFromStorage = localStorage.getItem('contacts');
    if (contactsFromStorage) {
      this.setState({ contacts: JSON.parse(contactsFromStorage) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const isNameExist = contacts.some(contact => contact.name === name);

    if (isNameExist) {
      alert(`${name} is already in contacts`);
      this.nameInput.current.focus();
      return;
    }

    const id = uuidv4();
    const newContact = { id, name, number };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={css.App}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
