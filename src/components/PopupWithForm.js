import React from "react";
import PropTypes from "prop-types";
import Popup from "./Popup";

export default function PopupWithForm({
  children,
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  submitButtonName = "Сохранить",
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <Popup
      name={name}
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <form
        className="popup__form"
        name={name}
        noValidate
        onSubmit={handleSubmit}
      >
        {children}
        <button type="submit" className="popup__form-submit">
          {submitButtonName}
        </button>
      </form>
    </Popup>
  );
}

PopupWithForm.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
