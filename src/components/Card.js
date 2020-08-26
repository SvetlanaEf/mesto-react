import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PropTypes from "prop-types";
import likeButton from "../images/like.svg";
import deleteButton from "../images/korzina.svg";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <img
        className="element__image"
        src={card.link}
        alt="фото"
        onClick={handleClick}
      />
      <button
        onClick={handleDeleteClick}
        className={`element__delete ${!isOwn && "element__delete_hidden"}`}
        type="button"
      >
        <img
          src={deleteButton}
          className="element__delete-img"
          alt="кнопка удаления"
        />
      </button>
      <div className="element__info">
        <span className="element__name">{card.name}</span>
        <div className="element__like-counter">
          <button
            onClick={handleLikeClick}
            className={`element__like ${isLiked && "element__like_active"}`}
          >
            <img src={likeButton} alt="кнопка лайка" />
          </button>
          <span className="element__like-number">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.object,
  onCardClick: PropTypes.func,
};
