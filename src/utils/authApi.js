class AuthApi {
  constructor(options) {
    this._options = options;
  }

  _fetch(url, options) {
    return fetch(`${this._options.baseUrl}${url}`, {
      headers: this._options.headers,
      ...options,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      });
  }

  getUser() {
    return this._fetch('/users/me');
  }

  login(form) {
    return this._fetch('/signin', {
      method: 'POST',
      body: JSON.stringify(form)
    });
  }

  register(form) {
    return this._fetch('/signup', {
      method: 'POST',
      body: JSON.stringify(form)
    });
  }
}

function getOptions() {
  const token = localStorage.getItem('token');
  const options = {
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
      "Content-Type": "application/json",
    }
  };

  if (token) {
    options.headers.authorization = `Bearer ${token}`;
  }

  return options;
}

const authApi = new AuthApi(getOptions());

export default authApi;