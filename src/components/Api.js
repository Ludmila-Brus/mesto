class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;  
  } 

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  } 

  editUserInfo(inputValues) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.person,
        about: inputValues.intro
      })      
    })
      .then((res) => this._getResponseData(res))
  }
  
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => this._getResponseData(res))
  }

  editLikeCard(methodLike, cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: methodLike,
      headers: this._headers
    })
      .then((res) => this._getResponseData(res))
  }

  addCard(inputValues) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues["elem-title"],
        link: inputValues["elem-lnk"]
      })
    })
      .then((res) => this._getResponseData(res))
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => this._getResponseData(res))
  }
      
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => this._getResponseData(res))
  }

  getInitialUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => this._getResponseData(res))
  }
  
}
  
export default Api;