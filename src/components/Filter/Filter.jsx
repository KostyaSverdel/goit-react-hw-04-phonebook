import React from 'react';
import PropTypes from 'prop-types';
import css from '../Filter/Filter.module.css';

const Filter = ({ value, onChange }) => (
  <div className={css.FilterConteiner}>
    <label className={css.FilterLabel}>
      Find contacts by name
      <input
        className={css.FilterInputs}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  </div>
);

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Filter;
