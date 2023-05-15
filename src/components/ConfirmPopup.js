import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose, onCardDelete, card, isLoading }) {

  function handleSubmit(evt) {
      evt.preventDefault();
      
      onCardDelete(card);
      }

  return (
    <PopupWithForm 
      title="Вы уверены?" 
      name="confirmation" 
      saveButtonText="Да" 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      isLoading={isLoading} 
      loadingText="Удаление..."
    />
  );
}

export default ConfirmPopup;