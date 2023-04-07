import React from 'react';
import PropTypes from 'prop-types';
import css from '../ContactListItem/ContactListItem.module.css';

function ContactListItem({ id, name, number, onDeleteContact }) {
  return (
    <li>
      {name}: {number}
      <button className={css.ButtonsDelete} onClick={() => onDeleteContact(id)}>
        Delete
      </button>
    </li>
  );
}

ContactListItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactListItem;
