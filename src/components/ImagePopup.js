import React from "react";

function ImagePopup({ card, isOpen, onClose }) {
  
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
      className={`popup popup_type_image${isOpen ? ' popup_opened' : ''}`}
      onMouseDown={handleOverlayMouseDown}
    >
        <div className="popup__img-container">
          <button className="popup__close-button" type="button" onClick={onClose}></button>
          <figure className="popup__figure">
            <img className="popup__image" src={card.link} alt={`Фото ${card.name}`} />
            <figcaption className="popup__caption">{card.name}</figcaption>
          </figure>
        </div>
      </div>
  );
}

export default ImagePopup;