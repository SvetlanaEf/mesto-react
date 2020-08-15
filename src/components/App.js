import React, { useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="name-input"
          type="text"
          className="popup__form-input"
          placeholder="Имя"
          name="name"
          minLength={2}
          maxLength={40}
          required
        />
        <span id="name-input-error" className="popup__form-input-error" />
        <input
          id="value-input"
          type="text"
          className="popup__form-input"
          placeholder="Должность"
          name="value"
          minLength={2}
          maxLength={200}
          required
        />
        <span id="value-input-error" className="popup__form-input-error" />
      </PopupWithForm>
      <PopupWithForm
        title="Новое место"
        name="place"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        submitButtonName="Создать"
      >
        <input
          id="name-input"
          type="text"
          className="popup__form-input"
          placeholder="Название"
          name="name"
          minLength={1}
          maxLength={30}
          required
        />
        <span id="name-input-error" className="popup__form-input-error" />
        <input
          id="value-input"
          type="url"
          className="popup__form-input"
          placeholder="Ссылка на картинку"
          name="value"
          required
        />
        <span id="value-input-error" className="popup__form-input-error" />
      </PopupWithForm>
      <PopupWithForm title="Вы уверенны" name="question" isOpen={false} submitButtonName="Да" />
      <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="avatar-input"
          type="url"
          className="popup__form-input"
          placeholder="Ссылка на новый аватар"
          name="avatar"
          required
        />
        <span id="avatar-input-error" className="popup__form-input-error" />
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <Footer />
    </div>
  );
}
