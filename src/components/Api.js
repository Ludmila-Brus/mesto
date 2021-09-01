class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;  
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Профиль: Что-то пошло не так: ${res.status}`);
      })
  }
  
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return;
        }
        return Promise.reject(`Удаление карточки: Что-то пошло не так: ${res.status}`);
      })
  }

  editLikeCard(methodLike, cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: methodLike,
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // отклоняем промис, чтобы перейти
        // в блок catch, если сервер вернул ошибку 
        return Promise.reject(`Лайк: Что-то пошло не так: ${res.status}`);
      })
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // отклоняем промис, чтобы перейти
        // в блок catch, если сервер вернул ошибку 
        return Promise.reject(`Карточка: Что-то пошло не так: ${res.status}`);
      })
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // отклоняем промис, чтобы перейти
        // в блок catch, если сервер вернул ошибку 
        return Promise.reject(`Аватар: Что-то пошло не так: ${res.status}`);
      })
  }
      
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // отклоняем промис, чтобы перейти
        // в блок catch, если сервер вернул ошибку 
        return Promise.reject(`Карточки: Что-то пошло не так: ${res.status}`);
      })
  }

  getInitialUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // отклоняем промис, чтобы перейти
        // в блок catch, если сервер вернул ошибку 
        return Promise.reject(`Профиль:: Что-то пошло не так: ${res.status}`);
      })
  }
  
}
  
export default Api;