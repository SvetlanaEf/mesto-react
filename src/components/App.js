import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api";
import authApi from '../utils/authApi';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [infoTooltipState, setInfoTooltipState] = useState({ isOpen: false, message: '', type: 'success' });
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  function handleError(error) {
    console.error(error);
  }

  useEffect(() => {
    if (!loggedIn) return;

    Promise.all([api.getUser(), api.getInitialCards()])
      .then(([user, cards]) => {
        if (user) {
          setCurrentUser(user);
        }

        if (cards && cards.length) {
          setCards(cards);
        }
      })
      .catch(handleError);
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch(handleError);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== card._id);
        setCards(newCards);
      })
      .catch(handleError);
  }

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
  //Обновление данных
  function handleUpdateUser({ name, about }) {
    api
      .editUser(name, about)
      .then(() => {
        setCurrentUser({ ...currentUser, name, about });
        setIsEditProfilePopupOpen(false);
      })
      .catch(handleError);
  }
  //Обновление аватара
  function handleUpdateAvatar({ avatar }) {
    api
      .updateAvatar(avatar)
      .then(() => {
        setCurrentUser({ ...currentUser, avatar });
        setIsEditAvatarPopupOpen(false);
      })
      .catch(handleError);
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(handleError);
  }

  //Закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipState({ isOpen: false });
  }

  function handleLogin(form) {
    authApi
      .login(form)
      .then(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          setLoggedIn(true);
          checkAuth();
          history.push('/');
        }
      })
      .catch(e => {
        setInfoTooltipState({
          isOpen: true,
          type: 'error',
          message: e.status === 400
            ? 'Не передано одно из полей'
            : e.status === 401
              ? 'Пользователь с email не найден'
              : 'Что-то пошло не так! Попробуйте ещё раз.'
        });
      });
  }

  function handleRegister(form) {
    authApi
      .register(form)
      .then(response => {
        if (response && response.data) {
          setInfoTooltipState({
            isOpen: true,
            type: 'success',
            message: 'Вы успешно зарегистрировались!'
          });
          history.push('/sign-in');
        }
      })
      .catch(e => {
        setInfoTooltipState({
          isOpen: true,
          type: 'error',
          message: e.status === 400
            ? 'Некорректно заполнено одно из полей'
            : 'Что-то пошло не так! Попробуйте ещё раз.'
        });
      });
  }

  function checkAuth() {
    if (!localStorage.getItem('token')) return;

    authApi
      .getUser()
      .then(response => {
        if (response.data) {
          setLoggedIn(true);
          setUserEmail(response.data.email);
          history.push('/');
        } else {
          logOut();
        }
      })
      .catch(logOut);
  }

  function logOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentUser({});
    setUserEmail('');
    history.push('/sign-in');
  }

  useEffect(checkAuth, []);

  useEffect(() => {
    function handleOverlayClose(evt) {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup-card_opened")
      ) {
        closeAllPopups();
      }
    }

    function handleEscapeClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener("click", handleOverlayClose);
    document.addEventListener("click", handleEscapeClose);

    return () => {
      document.removeEventListener("click", handleOverlayClose);
      document.removeEventListener("click", handleEscapeClose);
    };
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={userEmail} onLogout={logOut} />
        <Switch>
          <Route path="/sign-in" exact>
            <Login onSubmit={handleLogin}/>
          </Route>
          <Route path="/sign-up" exact>
            <Register onSubmit={handleRegister}/>
          </Route>
          <ProtectedRoute
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
        </Switch>
        <PopupWithForm
          title="Вы уверенны"
          name="question"
          isOpen={false}
          onClose={() => { }}
          onSubmit={() => { }}
          submitButtonName="Да"
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <InfoTooltip
          isOpen={infoTooltipState.isOpen}
          type={infoTooltipState.type}
          message={infoTooltipState.message}
          onClose={closeAllPopups}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
