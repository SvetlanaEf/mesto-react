import React, { useEffect } from "react";
import PropsTypes from "prop-types";
import profileAvatar from "../images/kusto.jpg";
import editButton from "../images/karandash.svg";
import addButton from "../images/plus.svg";
import api from "../utils/api";
import Card from "./Card.js";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState(profileAvatar);
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    Promise.all([api.getUser(), api.getInitialCards()]).then((data) => {
      const [userData, cards] = data;
      setUserName(userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar);
      setCards(cards, []);
    });
  });
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-update" onClick={onEditAvatar}>
          <img className="profile__avatar" src={userAvatar} alt="Аватар" />
        </div>
        <div className="profile__info">
          <div className="profile__info-content">
            <h1 className="profile__title">{userName}</h1>
            <button className="profile__edit-button" onClick={onEditProfile}>
              <img src={editButton} alt="кнопка для редактирования" />
            </button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button className="profile__add-button" onClick={onAddPlace}>
          <img src={addButton} alt="кнопка с плюсом" />
        </button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} />
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
};
