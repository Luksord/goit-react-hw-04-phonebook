import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const appStyles = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  // fontSize: 40,
  color: '#010101',
};

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onChangeInput = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  addContact = ({ name, number }) => {
    const exists = this.state.contacts.some(
      contact =>
        contact.name.toLocaleLowerCase() === name.toLocaleLowerCase().trim()
    );
    if (exists) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState(oldState => {
        const list = [...oldState.contacts];
        list.push({
          id: nanoid(),
          name: name,
          number: number,
        });
        return { contacts: list };
      });
    }
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };

  deleteContact = id => {
    const { contacts } = this.state;
    const filtered = contacts.filter(item => item.id !== id);
    this.setState({ contacts: filtered });
  };

  render() {
    return (
      <div style={{ appStyles }}>
        <ContactForm addContact={this.addContact} />
        <Filter filter={this.state.filter} onChangeInput={this.onChangeInput} />
        <ContactList
          deleteContact={this.deleteContact}
          contacts={this.filterContacts()}
        />
      </div>
    );
  }
}
