import React from "react";
import PropTypes from "prop-types";

export default function ImagePopup({ card, onClose }) {
  return card ? (
    <section className={`popup-card ${card ? "popup-card_opened" : ""}`}>
      <div className="popup-card__container">
        <button className="popup__close" onClick={onClose} />
        <img className="popup-card__image" src={card.link} alt="фото" />
        <p className="popup-card__name">{card.name}</p>
      </div>
    </section>
  ) : null;
}

ImagePopup.propTypes = {
  card: PropTypes.object,
  onClose: PropTypes.func,
};
