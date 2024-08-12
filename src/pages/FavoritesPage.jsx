import React, { useState } from "react";
import ContactFavorite from "../components/ContactFavorite";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import style from './styles/Favorites.module.css';

const FavoritesPage = () => {
  // Retrieve total number of pages for favorite contacts from the Redux store
  const totalPagesFavorite = useSelector(state => state.contact.totalPagesFavorite);
  const [page, setPage] = useState(1); // State to manage the current page

  return (
    <>
      <div className={style.contactFavoriteContainer}>
        <span className={style.contactFavoriteTitle}>Favorites</span>
        <hr className={style.contactFavoriteLine} />
      </div>
      <section className={style.contactFavorite}>
        {/* Render the list of favorite contacts with pagination support */}
        <ContactFavorite page={page} setPage={setPage} />
      </section>
      <section className={style.contactFavoritePagination}>
        {/* Render pagination component to navigate through pages of favorite contacts */}
        <Pagination page={page} setPage={setPage} totalPages={totalPagesFavorite} />
      </section>
    </>
  );
};

export default FavoritesPage;
