import React, { useState, useEffect } from 'react';
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

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  // const [name, setName] = useState('');
  // const [number, setNumber] = useState('');

  // ver.1 - Class Components
  // class App extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       contacts: [{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //           { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //           { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //           { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },],
  //       filter: '',
  //       name: '',
  //       number: '',
  //     };
  //   }

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts'); // <-- pobiera dane zapisane w pamięci lokalnej pod kluczem 'contacts'
    if (savedContacts) {
      // <-- jeśli istnieją zapisane kontakty,
      setContacts(JSON.parse(savedContacts)); // <-- parsuje je z formatu JSON na tablicę obiektów i aktualizuje stan contacts za pomocą funkcji setContacts.
    }
  }, []); // <-- hook 'useEffect' będzie wykonany tylko raz, gdy komponent zostanie zamontowany
  // ver. 1 - Class Components
  // componentDidMount() {
  //   const savedContacts = localStorage.getItem('contacts');
  //   if (savedContacts) {
  //     this.setState({ contacts: JSON.parse(savedContacts) });
  //   }
  // }

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts)); // <-- zapisuje stan contacts w pamięci lokalnej przeglądarki
  }, [contacts]); // <-- hook 'useEffect' będzie wykonywany za każdym razem, gdy wartość 'contacts' się zmieni.
  // ver. 1 - Class Components
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const onChangeInput = event => {
    const { name, value } = event.currentTarget; // <-- destrukturyzuje name i value z event.currentTarget, co odpowiada nazwie i wartości pola formularza, które wywołało zdarzenie zmiany.
    if (name === 'filter') {
      // <-- sprawdza czy zmiana dotyczy pola filtru
      setFilter(value); // <-- aktualizuje stan filter za pomocą metody setFilter, przekazując nową wartość
    }
    //   } else if (name === 'name') {
    //     setName(value);
    //   } else if (name === 'number') {
    //     setNumber(value);
    //   }
  };
  // ver. 1 - Class Components
  // onChangeInput = event => {
  //   const { name, value } = event.currentTarget;
  //   this.setState({ [name]: value });
  // };
  // ver. 2
  // onChangeInput = event => {
  //   const { name, value } = event.currentTarget;
  //   if (name === 'filter') {
  //     this.setState({ filter: value });
  //   } else if (name === 'name') {
  //     this.setState({ name: value });
  //   } else if (name === 'number') {
  //     this.setState({ number: value });
  //   }
  // };

  const addContact = ({ name, number }) => {
    const exists = contacts.some(
      // <--  metody 'some' sprawdza czy warunek jest spełniony dla przynajmniej jednego elementu tablicy
      contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim() // <-- sprawdza czy istnieje już kontakt o takiej samej nazwie, ignoruje wielkość liter porzez sprowadzenie ich do małych i spacje na początku i końcu
    );
    if (exists) {
      // <-- jeśli istnieje już kontakt o tej samej nazwie,
      alert(`${name} is already in contacts`); // <-- wyświetla komunikat ostrzegawczy
    } else {
      const newContact = {
        // <-- jeśli nie ma jeszcze kontaktu o takiej samej nazwie, tworzymy nowy obiekt kontaktu,
        id: nanoid(), // <-- zawierający unikalne id wygenerowane za pomocą funkcji nanoid,
        name: name, // <-- a także podaną nazwę i numer.
        number: number,
      };
      setContacts(prevContacts => [...prevContacts, newContact]); // <-- aktualizuje stan contacts, dodając nowy kontakt do poprzedniej listy kontaktów za pomocą funkcji setContacts, która przyjmuje poprzedni stan i dodaje do niego nowy kontakt.
    }
  };
  // ver. 1 - Class Components
  // addContact = ({ name, number }) => {
  //   const exists = this.state.contacts.some(
  //     contact =>
  //       contact.name.toLocaleLowerCase() === name.toLocaleLowerCase().trim()
  //   );
  //   if (exists) {
  //     alert(`${name} is already in contacts`);
  //   } else {
  //     this.setState(oldState => {
  //       const list = [...oldState.contacts];
  //       list.push({
  //         id: nanoid(),
  //         name: name,
  //         number: number,
  //       });
  //       return { contacts: list };
  //     });
  //   }
  // };
  // ver. 2
  // addContact = ({ name, number }) => {
  //   const { contacts } = this.state;
  //   const exists = contacts.some(
  //     contact => contact.name.trim().toLowerCase() === name.trim().toLowerCase()
  //   );
  //   if (exists) {
  //     alert(`${name} is already in contacts`);
  //     return false;
  //   } else {
  //     const newContact = {
  //       id: nanoid(),
  //       name: name,
  //       number: number,
  //     };
  //     this.setState(prevState => ({ contacts: [...prevState.contacts, newContact] }));
  //     return true;
  //   }
  // };

  const filterContacts = () => {
    return contacts.filter(
      (
        contact // <-- Wywołanie 'contacts.filter(...)' oznacza, że dla każdego kontaktu w tablicy contacts zostanie sprawdzony warunek zawarty w funkcji zwrotnej.
      ) => contact.name.toLowerCase().includes(filter.toLowerCase()) // <-- Warunek sprawdza czy nazwa kontaktu przekształcona na małe litery, zawiera frazę wpisaną przez użytkownika w filtrze (również przekształconą na małe litery). Metoda includes() zwraca true, jeśli fraza jest zawarta w nazwie kontaktu, w przeciwnym razie zwraca false. Jeśli warunek jest spełniony dla danego kontaktu, zostaje on zachowany w nowej tablicy wynikowej, która zostanie zwrócona jako lista przefiltrowanych kontaktów.
    );
  };
  // ver. 1 - Class Components
  // filterContacts = () => {
  //   const { contacts, filter } = this.state;
  //   const filteredContacts = contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(filter.toLowerCase())
  //   );
  //   return filteredContacts;
  // };
  // ver. 2
  // filterContacts = () => {
  //   const { contacts, filter } = this.state;
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(filter.toLowerCase())
  //   );
  // };

  const deleteContact = id => {
    setContacts(
      prevContacts => prevContacts.filter(contact => contact.id !== id) // <-- prevContacts.filter(...) tworzy nową tablicę kontaktów, w której każdy kontakt jest filtrowany na podstawie jego id. Warunek 'contact.id !== id' oznacza, że tylko kontakty których id nie jest równy id przekazanemu do usunięcia, zostaną zachowane.
    );
  };
  // ver. 1 - Class Components
  // deleteContact = id => {
  //   const { contacts } = this.state;
  //   const filtered = contacts.filter(item => item.id !== id);
  //   this.setState({ contacts: filtered });
  // };
  // ver. 2
  // deleteContact = id => {
  //   this.setState(prevState => ({
  //     contacts: prevState.contacts.filter(contact => contact.id !== id)
  //   }));
  // };

  return (
    <div style={{ appStyles }}>
      <ContactForm addContact={addContact} />
      <Filter filter={filter} onChangeInput={onChangeInput} />
      <ContactList deleteContact={deleteContact} contacts={filterContacts()} />
    </div>
  );
  // return (
  //   <div style={{ appStyles }}>
  //     <ContactForm
  //       addContact={addContact}
  //       onChangeInput={onChangeInput}
  //       name={name}
  //       number={number}
  //     />
  //     <Filter filter={filter} onChangeInput={onChangeInput} />
  //     <ContactList deleteContact={deleteContact} contacts={filterContacts()} />
  //   </div>
  // );
}

export default App;

// Class Components Version
// import { Component } from 'react';
// import { nanoid } from 'nanoid';
// import { ContactForm } from './ContactForm/ContactForm';
// import { ContactList } from './ContactList/ContactList';
// import { Filter } from './Filter/Filter';

// const appStyles = {
//   height: '100vh',
//   display: 'flex',
//   justifyContent: 'start',
//   alignItems: 'center',
//   // fontSize: 40,
//   color: '#010101',
// };

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//     name: '',
//     number: '',
//   };

//   componentDidMount() {
//     const savedContacts = localStorage.getItem('contacts');
//     if (savedContacts) {
//       this.setState({ contacts: JSON.parse(savedContacts) });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   onChangeInput = event => {
//     const { name, value } = event.currentTarget;
//     this.setState({ [name]: value });
//   };

//   addContact = ({ name, number }) => {
//     const exists = this.state.contacts.some(
//       contact =>
//         contact.name.toLocaleLowerCase() === name.toLocaleLowerCase().trim()
//     );
//     if (exists) {
//       alert(`${name} is already in contacts`);
//     } else {
//       this.setState(oldState => {
//         const list = [...oldState.contacts];
//         list.push({
//           id: nanoid(),
//           name: name,
//           number: number,
//         });
//         return { contacts: list };
//       });
//     }
//   };

//   filterContacts = () => {
//     const { contacts, filter } = this.state;
//     const filteredContacts = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//     return filteredContacts;
//   };

//   deleteContact = id => {
//     const { contacts } = this.state;
//     const filtered = contacts.filter(item => item.id !== id);
//     this.setState({ contacts: filtered });
//   };

//   render() {
//     return (
//       <div style={{ appStyles }}>
//         <ContactForm addContact={this.addContact} />
//         <Filter filter={this.state.filter} onChangeInput={this.onChangeInput} />
//         <ContactList
//           deleteContact={this.deleteContact}
//           contacts={this.filterContacts()}
//         />
//       </div>
//     );
//   }
// }
