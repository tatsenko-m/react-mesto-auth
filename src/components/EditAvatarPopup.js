import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isOpen) {
      inputRef.current.value = '';
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
  
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm 
      title="Обновить аватар" 
      name="avatar" 
      saveButtonText="Сохранить" 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      isLoading={isLoading} 
      loadingText="Сохранение..."
    >
      <input
        name="avatar"
        id="avatar"
        className="popup__item popup__item_type_link"
        type="url"
        ref={inputRef}
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error" id="avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;