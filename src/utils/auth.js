class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка, статус: ${res.status}`);
  }

  signUp(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkRes);
  }

  signIn(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkRes);
  }

  checkUser(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }).then(this._checkRes);
  }
}

const auth = new Auth({
  baseUrl: 'https://express-mesto-gha.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default auth;
