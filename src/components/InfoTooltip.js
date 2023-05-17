import React from 'react';
import successImage from '../images/success-image.svg';
import failImage from '../images/fail-image.svg';

function InfoTooltip({ isOpen, onClose, isAuthSuccess }) {
  const backgroundImage = isAuthSuccess ? `url(${successImage})` : `url(${failImage})`;

  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
      <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
      ></button>
      <div
        className="popup__info-tooltip-icon"
        style={{ backgroundImage }}
      ></div>
      <p className="popup__info-tooltip-text">
        {isAuthSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
      </p>
      </div>
    </div>
  );
}

export default InfoTooltip;