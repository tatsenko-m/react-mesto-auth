import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onConfirm, cards }) {
  const currentUser = React.useContext(CurrentUserContext);

  const cardsElements = cards.map((card) => (
    <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onConfirm={onConfirm} />
  ));

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар профиля"
            onClick={onEditAvatar}
          />
        </div>
        <article className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
        </article>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="gallery">
        <ul className="gallery__list">
          {cardsElements}
        </ul>
      </section>
    </main>
  );
}

export default Main;