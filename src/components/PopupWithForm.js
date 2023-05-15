import React from 'react';

function PopupWithForm({ title, name, children, saveButtonText, isOpen, onClose, onSubmit, isLoading, loadingText }) {
  
  function getContainerClassName(name) {
    let className = 'popup__container';
    if (name === 'confirmation') {
      className += ' popup__container_size_s';
    } else if (name === 'avatar') {
      className += ' popup__container_size_m';
    }
    return className;
  }

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
      className={`popup popup_type_${name}${isOpen ? ' popup_opened' : ''}`}
      onMouseDown={handleOverlayMouseDown}
    >
      <div className={getContainerClassName(name)}>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__save-button" type="submit">
            { isLoading ? loadingText : saveButtonText }
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
