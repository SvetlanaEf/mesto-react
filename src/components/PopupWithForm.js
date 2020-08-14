import React from "react";
import PropTypes from "prop-types";

export default function PopupWithForm({
  children,
  name,
  title,
  isOpen,
  onClose,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close" onClick={onClose} />
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form" name={name} noValidate>
          {children}
        </form>
      </div>
    </div>
  );
}

PopupWithForm.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
