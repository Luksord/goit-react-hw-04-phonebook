import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    // const { name, number } = this.state;
    // this.props.addContact({ name, number });
    // this.setState({ name: '', number: '' });
    const name = event.target.name.value;
    const number = event.target.number.value;
    const { addContact } = this.props;
    addContact({ id: nanoid(), name, number });
    event.target.reset();
  };

  render() {
    return (
      <section className={css.form}>
        <h1 className={css.form_title}>Phonebook</h1>
        <form className={css.form_container} onSubmit={this.handleSubmit}>
          <label className={css.form_label}>Name</label>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            placeholder="Enter name"
            className={css.form_input}
            required
          />
          <label className={css.form_label}>Number</label>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            placeholder="Enter phone number"
            className={css.form_input}
            required
          />
          <button className={css.form_btn} type="submit">
            Add contact
          </button>
        </form>
      </section>
    );
  }
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  addContact: PropTypes.func.isRequired,
};
