import React, { useState } from 'react';
import ContactList from '../components/ContactList';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import style from './styles/Contacts.module.css';

const ContactsPage = ({ loading, error }) => {
  // Retrieve total number of pages from the Redux store
  const totalPages = useSelector(state => state.contact.totalPages);
  const [page, setPage] = useState(1); // State to manage the current page

  // Display loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message if there's an issue loading contacts
  if (error) {
    return <div>Error loading contacts</div>;
  }

  return (
    <>
      <div className={style.contactListContainer}>
        <span className={style.contactListTitle}>Contacts List</span>
        <hr className={style.contactListLine} />
      </div>
      <section className={style.contactList}>
        {/* Render the list of contacts with pagination support */}
        <ContactList page={page} setPage={setPage} />
      </section>
      <section className={style.contactListPagination}>
        {/* Render pagination component to navigate through pages */}
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </section>
    </>
  );
};

export default ContactsPage;
