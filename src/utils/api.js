import {config} from './utils';

class Api {
    constructor(options) {
      this._options = options;
      this._fetch = (url, options) => {
        return fetch(`${this._options.baseUrl}${url}`, {
          headers: this._options.headers,
          ...options,
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          });
      };
    }
  
    getInitialCards() {
      return this._fetch("/cards");
    }
  
    getUser() {
      return this._fetch("/users/me");
    }
  
    editUser(name, about) {
      return this._fetch("/users/me", {
        method: "PATCH",
        body: JSON.stringify({ name, about }),
      });
    }
  
    addNewCard(name, link) {
      return this._fetch("/cards", {
        method: "POST",
        body: JSON.stringify({ name, link }),
      });
    }
  
    deleteCard(cardId) {
      return this._fetch(`/cards/${cardId}`, {
        method: "DELETE",
      });
    }
  
    likeCard(cardId) {
      return this._fetch(`/cards/likes/${cardId}`, {
        method: "PUT",
      });
    }
  
    unLikeCard(cardId) {
      return this._fetch(`/cards/likes/${cardId}`, {
        method: "DELETE",
      });
    }
  
    updateAvatar(avatar) {
      return this._fetch(`/users/me/avatar`, {
        method: "PATCH",
        body: JSON.stringify({ avatar }),
      });
    }
  }

  const api = new Api({
    baseUrl: config.baseUrl,
    headers: {
      authorization: config.token,
      "Content-Type": "application/json",
    }
  });

  export default api;