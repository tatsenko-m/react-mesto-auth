import React from 'react';
import successImage from '../images/success-image.svg';
import failImage from '../images/fail-image.svg';

function InfoTooltip({ isOpen, onClose, isAuthSuccess }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
      <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
      ></button>
      <img
        src={isAuthSuccess ? successImage : failImage} 
        alt="Иконка статуса" 
        className="popup__info-tooltip-icon"
      />
      <p className="popup__info-tooltip-text">
        {isAuthSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
      </p>
      </div>
    </div>
  );
}

export default InfoTooltip;