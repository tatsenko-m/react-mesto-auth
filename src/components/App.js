import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cardForDelete, setCardForDelete] = React.useState({});
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleConfirmClick(card) {
    setCardForDelete(card);
    setIsConfirmPopupOpen(true);
}

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards(() => cards.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => alert(err));
  }

  function handleCardDelete(card) {
    setIsLoading(true);

    api.deleteCard(card._id)
    .then(() => {
      setCards(() => cards.filter((c) => c._id !== card._id));
      closeAllPopups();
    })
    .catch((err) => alert(err))
    .finally(() => setIsLoading(false));;
  }

  function handleApiMethod(apiMethod, args, onSuccess) {
    setIsLoading(true);

    apiMethod(args)
      .then(onSuccess)
      .then(closeAllPopups)
      .catch((err) => alert(err))
      .finally(() => setIsLoading(false));
  }
  
  function handleUpdateUser({ name, about }) {
    handleApiMethod(api.setUserInfo.bind(api), { name, about }, (user) => setCurrentUser(user));
  }
  
  function handleUpdateAvatar({ avatar }) {
    handleApiMethod(api.setUserAvatar.bind(api), { avatar }, (user) => setCurrentUser(user));
  }
  
  function handleAddPlaceSubmit({ name, link }) {
    handleApiMethod(api.addCard.bind(api), { name, link }, (newCard) => setCards([newCard, ...cards]));
  }

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardList()])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch((err) => alert(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onEditAvatar={handleEditAvatarClick} 
        onCardClick={handleCardClick} 
        onCardLike={handleCardLike} 
        onConfirm={handleConfirmClick} 
        cards={cards}
      />
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />
      <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} card={cardForDelete} isLoading={isLoading} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
