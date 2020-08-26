import React from "react";
import PropTypes from "prop-types";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef("");

  function handleSubmit(e) {
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = "";
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-input"
        type="url"
        className="popup__form-input"
        placeholder="Ссылка на новый аватар"
        name="avatar"
        required
        ref={avatarRef}
      />
      <span id="avatar-input-error" className="popup__form-input-error" />
    </PopupWithForm>
  );
}

EditAvatarPopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdateAvatar: PropTypes.func,
};
