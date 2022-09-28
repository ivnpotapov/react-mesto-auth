class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this.changeLikeCardStatus = this.changeLikeCardStatus.bind(this);
  }

  set headersAuth(token) {
    this._headers.authorization = `Bearer ${token}`;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка, статус: ${res.status}`);
  }

  getUserInfoApi() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkRes);
  }

  getInitialCardsApi() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkRes);
  }

  setUserInfoApi({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkRes);
  }

  addNewCardApi({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkRes);
  }

  deleteCardApi(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkRes);
  }

  addLikeApi(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkRes);
  }

  deleteLikeApi(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkRes);
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.deleteLikeApi(id);
    } else {
      return this.addLikeApi(id);
    }
  }

  setAvatarApi({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkRes);
  }
}

const api = new Api({
  baseUrl: 'https://api.iv-partner.nomoredomains.xyz',
  headers: {
    authorization: '',
    'Content-Type': 'application/json',
  },
});

export default api;
