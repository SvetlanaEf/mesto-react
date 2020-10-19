import React from "react";
import PropTypes from "prop-types";

export default function Popup({
  children,
  name,
  title,
  isOpen,
  onClose
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close" onClick={onClose} />
        <h3 className="popup__title">{title}</h3>
        {children}
      </div>
    </div>
  );
}

Popup.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};
