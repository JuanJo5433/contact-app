import React from "react";
import style from "./styles/CardContact.module.css";

const CardContact = ({
  name,
  email,
  imgUrl,
  favorite,
  onDelete,
  onToggleFavorite,
  showDelete,
  styleFavorite,
}) => {
  return (
    <div className={style.cardContainer}>
      <div className={style.card}>
        <img
          className={`${style.cardImg} ${favorite ? style.cardImgFavorite : ""}`}
          src={imgUrl}
          alt="Avatar Profile"
        />
        <h5 className={style.cardName}>{name}</h5>
        <span className={style.cardEmail}>{email}</span>
        <hr className={style.cardLine} />

        <div className={style.cardButtonContainer}>
          {favorite ? (
            <>
              <div
                className={style.cardButtonRemove}
                onClick={onToggleFavorite}
              >
                <i className={`fa-solid fa-x ${style.cardButtonIcon}`}></i>
                <span className={style.cardButtonText}>REMOVE</span>
              </div>
              {showDelete && (
                <div className={style.cardButtonDelete} onClick={onDelete}>
                  <i className={`fa-solid fa-trash ${style.cardButtonIcon}`}></i>
                </div>
              )}
            </>
          ) : (
            <>
              <div
                className={style.cardButtonFavorite}
                onClick={onToggleFavorite}
              >
                <i className={`fa-solid fa-heart ${style.cardButtonIcon}`}></i>
              </div>
              {showDelete && (
                <div className={style.cardButtonDelete} onClick={onDelete}>
                  <i className={`fa-solid fa-trash ${style.cardButtonIcon}`}></i>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardContact;
