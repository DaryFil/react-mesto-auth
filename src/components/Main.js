import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const { name, about, avatar } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img alt="фото кошки" src={avatar} className="profile__avatar" />
          <div className="profile__avatar-save" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{name}</h1>
            <button
              type="button"
              className="profile__edit-button opacity"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__about">{about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button opacity"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
