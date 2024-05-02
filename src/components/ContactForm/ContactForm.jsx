import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import { useState } from 'react';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  // export class ContactForm extends Component {
  //   state = {
  //     name: '',
  //     number: '',
  //   };

  const handleSubmit = event => {
    event.preventDefault();
    const exists = addContact({ id: nanoid(), name, number });
    if (!exists) {
      setName(''); // Resetting the input field after submitting
      setNumber(''); // Resetting the input field after submitting
      // setIsNameFilled(false);
    }
  };
  // ver. 2 - Functional Components
  // const handleSubmit = event => {
  //   event.preventDefault();
  //   const name = event.target.name.value;
  //   const number = event.target.number.value;
  //   addContact({ id: nanoid(), name, number });
  //   event.target.reset();
  // };
  // ver. 1 - Class Components
  //   handleSubmit = event => {
  //     event.preventDefault();
  //     const name = event.target.name.value;
  //     const number = event.target.number.value;
  //     const { addContact } = this.props;
  //     addContact({ id: nanoid(), name, number });
  //     event.target.reset();
  //   };

  // render() {
  return (
    <section className={css.form}>
      <h1 className={css.form_title}>Phonebook</h1>
      <form className={css.form_container} onSubmit={handleSubmit}>
        <label className={css.form_label}>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={event => setName(event.target.value)}
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
          value={number}
          onChange={event => setNumber(event.target.value)}
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          pattern="[0-9+\-()\s]+"
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
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
// ContactForm.propTypes = {
//   name: PropTypes.string,
//   number: PropTypes.string,
//   addContact: PropTypes.func.isRequired,
// };

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import css from './ContactForm.module.css';
// import { nanoid } from 'nanoid';

// class ContactForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       number: ''
//     };
//   }

//   handleSubmit = event => {
//     event.preventDefault();
//     const { name, number } = this.state;
//     const { addContact } = this.props;
//     const exists = addContact({ id: nanoid(), name, number });
//     if (!exists) {
//       this.setState({ name: '', number: '' });
//     }
//   };

//   render() {
//     const { name, number } = this.state;
//     return (
//       <section className={css.form}>
//         <h1 className={css.form_title}>Phonebook</h1>
//         <form className={css.form_container} onSubmit={this.handleSubmit}>
//           <label className={css.form_label}>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={name}
//             onChange={event => this.setState({ name: event.target.value })}
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             placeholder="Enter name"
//             className={css.form_input}
//             required
//           />
//           <label className={css.form_label}>Number</label>
//           <input
//             type="tel"
//             name="number"
//             value={number}
//             onChange={event => this.setState({ number: event.target.value })}
//             pattern="[0-9+\-()\s]+"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             placeholder="Enter phone number"
//             className={css.form_input}
//             required
//           />
//           <button className={css.form_btn} type="submit">
//             Add contact
//           </button>
//         </form>
//       </section>
//     );
//   }
// }

// ContactForm.propTypes = {
//   addContact: PropTypes.func.isRequired,
// };

// export default ContactForm;
