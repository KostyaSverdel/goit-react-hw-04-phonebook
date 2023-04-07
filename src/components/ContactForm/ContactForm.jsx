import React from 'react';
import PropTypes from 'prop-types';
import css from '../ContactForm/ContactForm.module.css';

class ContactForm extends React.Component {
  nameInput = React.createRef();
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleNumberChange = e => {
    this.setState({ number: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={css.phoneForm} onSubmit={this.handleSubmit}>
        <label className={css.labelsPhone}>
          Name
          <input
            className={css.inputsForm}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </label>
        <label className={css.labelsPhone}>
          Phone Number
          <input
            className={css.inputsForm}
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleNumberChange}
          />
        </label>
        <button className={css.buttonForm} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
