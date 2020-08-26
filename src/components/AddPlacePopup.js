import React from "react";
import PropTypes from "prop-types";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleSubmit() {
    onAddPlace({ name, link });
    setName("");
    setLink("");
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="place"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="popup__form-input"
        placeholder="Название"
        name="name"
        minLength={1}
        maxLength={30}
        required
      />
      <span id="name-input-error" className="popup__form-input-error" />
      <input
        id="value-input"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        type="url"
        className="popup__form-input"
        placeholder="Ссылка на картинку"
        name="value"
        required
      />
      <span id="value-input-error" className="popup__form-input-error" />
    </PopupWithForm>
  );
}
AddPlacePopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onAddPlace: PropTypes.func,
};
