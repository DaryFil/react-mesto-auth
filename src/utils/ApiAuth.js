class ApiAuth {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  login(data) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(this._checkAnswer);
  }
  register(data) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(this._checkAnswer);
  }

  checkAuth() {
    const JWT = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT}`,
      },
    }).then(this._checkAnswer);
  }
}
export const apiAuth = new ApiAuth("https://auth.nomoreparties.co");
