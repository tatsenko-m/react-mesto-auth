import React from 'react';
import successImage from '../images/success-image.svg';
import failImage from '../images/fail-image.svg';

function InfoTooltip({ isOpen, onClose, isAuthSuccess, successInfoTooltipText, failInfoTooltipText }) {
  const backgroundImage = isAuthSuccess ? `url(${successImage})` : `url(${failImage})`;

  React.useEffect(() => {
    const handleEscKeyDown = (evt) => {
      if (evt.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKeyDown);
    
      return () => {
        document.removeEventListener('keydown', handleEscKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const handleOverlayMouseDown = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    }
  };

  return (
    <div 
      className={`popup ${isOpen && "popup_opened"}`} 
      onMouseDown={handleOverlayMouseDown}
    >
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
        {isAuthSuccess ? successInfoTooltipText : failInfoTooltipText}
      </p>
      </div>
    </div>
  );
}

export default InfoTooltip;