import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from '../ContactForm/ContactForm.module.css';

function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleNumberChange = e => {
    setNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <form className={css.phoneForm} onSubmit={handleSubmit}>
      <label className={css.labelsPhone}>
        Name
        <input
          className={css.inputsForm}
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label className={css.labelsPhone}>
        Phone Number
        <input
          className={css.inputsForm}
          type="tel"
          name="number"
          value={number}
          onChange={handleNumberChange}
        />
      </label>
      <button className={css.buttonForm} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
