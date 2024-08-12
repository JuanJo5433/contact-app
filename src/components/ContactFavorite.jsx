import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardContact from './CardContactComponent';
import { calculateTotalPagesFavorites, toggleFavorite, deleteContact } from '../redux/reducers/contactReducer';
import style from './styles/ContactFavorite.module.css';

const ContactFavorite = ({ page = 1, setPage, showDelete = false }) => {
  const contacts = useSelector((state) => state.contact.contacts);
  const dispatch = useDispatch();

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
    dispatch(calculateTotalPagesFavorites());
    if (setPage) {
      const updatedContacts = contacts.filter(contact => contact.id !== id && contact.favorite);
      const contactsPerPage = 8;
      const startIndex = (page - 1) * contactsPerPage;
      if (updatedContacts.slice(startIndex, startIndex + contactsPerPage).length === 0 && page > 1) {
        setPage(page - 1);
      }
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
    dispatch(calculateTotalPagesFavorites());
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    const contactsPerPage = 8;
    const startIndex = (page - 1) * contactsPerPage;
    if (updatedContacts.slice(startIndex, startIndex + contactsPerPage).length === 0 && page > 1) {
      setPage(page - 1);
    }
  };

  const contactsPerPage = 8;
  const favoriteContacts = contacts.filter(contact => contact.favorite);
  const startIndex = (page - 1) * contactsPerPage;
  const endIndex = startIndex + contactsPerPage;
  const currentContacts = setPage ? favoriteContacts.slice(startIndex, endIndex) : favoriteContacts;

  return (
    <div className={style.contactFavoriteContainer}>
      {currentContacts.length > 0 ? (
        currentContacts.map(contact => (
          <CardContact
            key={contact.id}
            name={`${contact.first_name} ${contact.last_name}`}
            email={contact.email}
            imgUrl={contact.avatar}
            favorite={contact.favorite}
            onToggleFavorite={() => handleToggleFavorite(contact.id)}
            onDelete={showDelete ? () => handleDelete(contact.id) : null}
            showDelete={showDelete}
            styleFavorite={true}
          />
        ))
      ) : (
        <p className={style.noFavoritesMessage}>You don't have a favorite contact</p>
      )}
    </div>
  );
};

export default ContactFavorite;
