import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardContact from './CardContactComponent';
import { deleteContact, toggleFavorite, calculateTotalPages } from '../redux/reducers/contactReducer';
import style from './styles/ContactList.module.css';

const ContactList = ({ page = 1, setPage }) => {
  const contacts = useSelector((state) => state.contact.contacts);
  const dispatch = useDispatch();

  // Handles toggling the favorite status of a contact
  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
    dispatch(calculateTotalPages());
    // Optionally, update pagination if necessary
  };

  // Handles deleting a contact
  const handleDelete = (id) => {
    dispatch(deleteContact(id));
    dispatch(calculateTotalPages());
    
    // Check if the current page is empty after deletion
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    const contactsPerPage = 8;
    const startIndex = (page - 1) * contactsPerPage;
    // If the current page has no contacts, move to the previous page
    if (updatedContacts.slice(startIndex, startIndex + contactsPerPage).length === 0 && page > 1) {
      setPage(page - 1);
    }
  };

  const contactsPerPage = 8;
  // Slice the list of contacts for pagination
  const startIndex = (page - 1) * contactsPerPage;
  const endIndex = startIndex + contactsPerPage;
  const currentContacts = contacts.slice(startIndex, endIndex);

  return (
    <div className={style.contactListContainer}>
      {currentContacts.length > 0 ? (
        currentContacts.map(contact => (
          <CardContact
            key={contact.id}
            name={`${contact.first_name} ${contact.last_name}`}
            email={contact.email}
            imgUrl={contact.avatar}
            favorite={contact.favorite}
            onToggleFavorite={() => handleToggleFavorite(contact.id)}
            onDelete={() => handleDelete(contact.id)}
            showDelete={true} // Always show delete button in ContactList
          />
        ))
      ) : (
        <p className={style.noContactsMessage}>No contacts available</p>
      )}
    </div>
  );
};

export default ContactList;
