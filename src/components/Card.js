import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useContext, useState } from "react";

// export default function
const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const userId = useContext(CurrentUserContext)._id;
  const isOwn = card.owner._id === userId; // Определяем, являемся ли мы владельцем текущей карточки
  const isLiked = card.likes.some((i) => i._id === userId);

  const handleCardClick = () => {
    onCardClick(card);
   };

   const handleCardLike = () => {
    onCardLike(card, isLiked);
   };
const handleCardDelete = () => {
  onCardDelete(card._id);
}

  return (
    <article className="card">
      <img
        className="card__image"
        alt={card.name}
        src={card.link}
        onClick={handleCardClick}
      />
      {/* // Далее в разметке используем переменную для условного рендеринга */}
      {isOwn && (
        <button onClick={handleCardDelete}
        className="card__delete-button opacity" type="button" />
      )}
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button
            onClick={handleCardLike}
            type="button" 
            className={`card__like-button ${
              isLiked ? "card__like-button_active" : ""
            }`}
          />

          <span className="card__like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
};
export default Card;
