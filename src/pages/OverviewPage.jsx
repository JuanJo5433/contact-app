import React from 'react';
import ContactList from '../components/ContactList';
import ContactFavorite from '../components/ContactFavorite';
import styles from './styles/Overview.module.css';

const OverviewPage = ({ loading, error }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading contacts</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>Favorites</span>
        <hr className={styles.divider} />
      </div>
      <section>
        <ContactFavorite showDelete={false} /> {/* No show delete option here */}
      </section>

      <div className={styles.container}>
        <span className={styles.title}>Contacts</span>
        <hr className={styles.divider} />
      </div>

      <section>
        <ContactList showDelete={false} /> {/* Show delete option here */}
      </section>
    </>
  );
}

export default OverviewPage;
