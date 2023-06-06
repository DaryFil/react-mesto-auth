import { settings } from "./constants.js";


class Api {
  constructor(setting) {
    this._address = setting.baseUrl;
    this._headers = setting.headers;
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  _request(endpoint, options) {
    return fetch(`${this._address}${endpoint}`, options).then(
      this._checkAnswer
    );
  }

  getUserInfo() {
    return this._request(`/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  saveUserInfo({ name, about }) {
    return this._request(`/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: name, about: about }),
    });
  }

  saveUserAvatar({ avatar }) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatar }),
    });
  }

  getInitialCards() {
    return this._request(`/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }


  addNewCard(data) {
    return this._request(`/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }
  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

 
  toggleLike(cardId, method) {
    return this._request(`/cards/${cardId}/likes`, {
      method: method,
          headers: this._headers,
        });
  }
}

const api = new Api(settings);
export default api;
