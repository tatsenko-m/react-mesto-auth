import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import { ProtectedRoute } from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import NotFound from './NotFound';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cardForDelete, setCardForDelete] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isAuthSuccess, setIsAuthSuccess] = React.useState(false);
  const [userData, setUserData] = React.useState({ email: '' });

  const navigate = useNavigate();
  const location = useLocation();
  
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
    setIsInfoTooltipOpen(false);
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
    .finally(() => setIsLoading(false));
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

  function handleRegister(password, email) {
    setIsLoading(true);

    auth.register(password, email)
    .then(() => {
      setIsAuthSuccess(true);
      navigate('/sign-in');
    })
    .catch((err) => {
      setIsAuthSuccess(false);
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
      setIsInfoTooltipOpen(true);
    });
  }

  function handleLogin(password, email) {
    setIsLoading(true);

    auth.authorize(password, email)
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        setUserData({ email: email });
        const url = location.state?.backUrl || '/';
        navigate(url);
      }
    })
    .catch((err) => {
      setIsAuthSuccess(false);
      setIsInfoTooltipOpen(true);
      console.log(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleTokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token)
        .then((user) => {
          setLoggedIn(true);
          setUserData({ email: user.data.email });
          const url = location.state?.backUrl || '/';
          navigate(url);
        })
        .catch((err) => alert(err));
    }
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setUserData({ email: '' });
    setLoggedIn(false);
    navigate('/sign-in');
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCardList()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => alert(err));
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header onSignOut={handleSignOut} email={userData.email} />
      <Routes>
      <Route 
        path="/" 
        element={
        <ProtectedRoute 
          element={Main} 
          loggedIn={loggedIn} 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick} 
          onCardLike={handleCardLike} 
          onConfirm={handleConfirmClick} 
          cards={cards}
        />
        } 
      />
      <Route path="/sign-in" element=
        {
          <Login 
            onLogin={handleLogin} 
            isLoading={isLoading} 
            submitButtonText="Войти" 
            loadingText="Входим..." 
          />
        } 
      />
      <Route path="/sign-up" element=
        {
          <Register 
            onRegister={handleRegister} 
            isLoading={isLoading} 
            submitButtonText="Зарегистрироваться" 
            loadingText="Регистрируемся..." 
          />
        } 
      />
      <Route path="*" element={<NotFound />} />
      </Routes>
      {loggedIn && <Footer />}
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />
      <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} card={cardForDelete} isLoading={isLoading} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
      <InfoTooltip 
        isOpen={isInfoTooltipOpen} 
        onClose={closeAllPopups} 
        isAuthSuccess={isAuthSuccess} 
        successInfoTooltipText="Вы успешно зарегистрировались!" 
        failInfoTooltipText="Что-то пошло не так! Попробуйте ещё раз." 
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
