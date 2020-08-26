import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PropTypes from "prop-types";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (!Object.keys(currentUser).length) return;
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={() => onUpdateUser({ name, about: description })}
    >
      <input
        id="name-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="popup__form-input"
        placeholder="Имя"
        name="name"
        minLength={2}
        maxLength={40}
        required
      />
      <span id="name-input-error" className="popup__form-input-error" />
      <input
        id="value-input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        className="popup__form-input"
        placeholder="Должность"
        name="value"
        minLength={2}
        maxLength={200}
        required
      />
      <span id="value-input-error" className="popup__form-input-error" />
    </PopupWithForm>
  );
}
EditProfilePopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdateUser: PropTypes.func,
};
