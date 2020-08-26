import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PropsTypes from "prop-types";
import profileAvatar from "../images/kusto.jpg";
import editButton from "../images/karandash.svg";
import addButton from "../images/plus.svg";
import Card from "./Card.js";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const { avatar, name, about } = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-update" onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            src={avatar || profileAvatar}
            alt="Аватар"
          />
        </div>
        <div className="profile__info">
          <div className="profile__info-content">
            <h1 className="profile__title">{name}</h1>
            <button className="profile__edit-button" onClick={onEditProfile}>
              <img src={editButton} alt="кнопка для редактирования" />
            </button>
          </div>
          <p className="profile__subtitle">{about}</p>
        </div>
        <button className="profile__add-button" onClick={onAddPlace}>
          <img src={addButton} alt="кнопка с плюсом" />
        </button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

Main.propsTypes = {
  onEditProfile: PropsTypes.func,
  onAddPlace: PropsTypes.func,
  onEditAvatar: PropsTypes.func,
  onCardClick: PropsTypes.func,
  onCardLike: PropsTypes.func,
  onCardDelete: PropsTypes.func,
  cards: PropsTypes.array,
};
