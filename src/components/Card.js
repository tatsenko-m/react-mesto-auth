import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = ( 
    `card__like-button ${isLiked && 'card__like-button_active'}` 
  );

  function handleClick() {
   props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onConfirm(props.card);
  }

  return (
    <li className="card">
      <img className="card__image" src={props.card.link} alt={`Фото ${props.card.name}`} onClick={handleClick} />
      <div className="card__description">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-group">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
          <span className="card__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
      {isOwn && <button className="card__delete-button" type="button" onClick={handleDeleteClick} />}
    </li>
  );
}

export default Card;