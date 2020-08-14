import React from "react";
import PropTypes from "prop-types";
import LikeButton from "../images/like.svg";
import DeleteButton from "../images/korzina.svg";

export default function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="element">
      <img
        className="element__image"
        src={card.link}
        alt="фото"
        onClick={handleClick}
      />
      <div className="element__info">
        <span className="element__name">{card.name}</span>
        <div className="element__like-counter">
          <button className="element__like">
            <img src={LikeButton} alt="кнопка лайка" />
          </button>
          <span className="element__like-number">0</span>
        </div>
      </div>
      <button className="element__delete">
        <img
          src={DeleteButton}
          className="element__delete-img"
          alt="кнопка удаления"
        />
      </button>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.object,
  onCardClick: PropTypes.func,
};
