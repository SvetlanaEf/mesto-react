import React from 'react';
import PropTypes from 'prop-types';
import SuccessIcon from '../images/success-icon.svg';
import ErrorIcon from '../images/error-icon.svg';
import Popup from './Popup';

export default function InfoTooltip({ isOpen, onClose, type, message }) {
  return (
    <Popup
      name='info-tooltip'
      isOpen={isOpen}
      onClose={onClose}
      title=''
    >
      <div className="info-tooltip">
        <img className="info-tooltip__icon" src={type === 'success' ? SuccessIcon : ErrorIcon} alt="" />
        <p className="info-tooltip__msg">{message}</p>
      </div>
    </Popup>
  );
}

InfoTooltip.propTypes = {
  type: PropTypes.oneOf(['success', 'error']),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string
};