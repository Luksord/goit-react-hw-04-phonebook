import PropTypes from 'prop-types';
import css from '../ContactList/ContactList.module.css';

export const ContactList = ({ contacts, children, deleteContact }) => {
  return (
    <div className={css.contacts_container}>
      <h2>Contacts</h2>
      {children}
      <ul className={css.contacts_list}>
        {contacts.map(({ id, name, number }) => (
          <li className={css.contacts_item} key={id}>
            <p className={css.contacts_name}>{name}</p>
            <p className={css.contacts_number}>{number}</p>
            <button
              onClick={() => {
                deleteContact(id);
              }}
              className={css.contacts_btn}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func,
};

// export const Contacts = ({ contacts, deleteContact }) => {
// //   const handleDelete = id => {
// //     deleteContact(id);
// //   };

//   return (
//     <ul className={css.contacts}>
//       {contacts.map(({ id, name, number }) => (
//         <li className={css.item} key={id}>
//           <span>{name}:</span>
//           <span>{number}</span>
//           <button
//             className={css.btn}
//             type="button"
//             onClick={() => deleteContact(id)}
//           >
//             Delete
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// };

// Contacts.propTypes = {
//   deleteContact: PropTypes.func.isRequired,
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };
