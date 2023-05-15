import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setTitle('');
      setLink('');
    }
  }, [isOpen]);

  function handleInputChange(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    if (name === 'title') {
        setTitle(value);
      } else if (name === 'link') {
        setLink(value);
      }
  }

  function handleSubmit(evt) {
      evt.preventDefault();
      
      onAddPlace({
        name: title,
        link,
      });
      }

  return (
    <PopupWithForm 
      title="Новое место" 
      name="card" 
      saveButtonText="Создать" 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      isLoading={isLoading} 
      loadingText="Сохранение..."
    >
      <input
        name="title"
        id="title"
        className="popup__item popup__item_type_title"
        type="text"
        value={title}
        onChange={handleInputChange}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error" id="title-error"></span>
      <input
        name="link"
        id="link"
        className="popup__item popup__item_type_link"
        type="url"
        value={link}
        onChange={handleInputChange}
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error" id="link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;