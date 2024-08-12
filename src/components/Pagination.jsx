import React from 'react';
import style from './styles/Pagination.module.css'

const Pagination = ({ page, setPage, totalPages }) => {

  // Function to handle the next page action
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1); // Update the page state to the next page
    }
  };

  // Function to handle the previous page action
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1); // Update the page state to the previous page
    }
  };

  return (
    <div className={style.paginationContainer}>
      <p className={style.paginationText}>
        <strong className={style.paginationNumber}>{page}</strong> de <strong className={style.paginationNumber}>{totalPages}</strong>
      </p>
      <a
        onClick={handlePrevPage} // Call handlePrevPage on click
        className={style.paginationArrows}
        type="button"
      >
        <i className="fa-solid fa-angle-left"></i>
      </a>
      <a
        onClick={handleNextPage} // Call handleNextPage on click
        className={style.paginationArrows}
        type="button"
      >
        <i className="fa-solid fa-angle-right"></i>
      </a>
    </div>
  );
};

export default Pagination;
