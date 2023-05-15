import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleInputChange(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    if (name === 'name') {
        setName(value);
      } else if (name === 'about') {
        setDescription(value);
      }
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm 
      title="Редактировать профиль" 
      name="profile" 
      saveButtonText="Сохранить" 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      isLoading={isLoading} 
      loadingText="Сохранение..."
    >
      <input
        name="name"
        id="name"
        className="popup__item popup__item_type_name"
        type="text"
        value={name || ''}
        onChange={handleInputChange}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__error" id="name-error"></span>
      <input
        name="about"
        id="about"
        className="popup__item popup__item_type_about"
        type="text"
        value={description || ''}
        onChange={handleInputChange}
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__error" id="about-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;