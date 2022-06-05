class Api {
    constructor({ baseUrl, headers, renderCards }) {
        this._baseUrl = baseUrl;
        this._authorization = headers.authorization;
        this._renderCards = renderCards;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._authorization
            }
        })
            .then((res) => {
                return this._getResponse(res);
            });
    }

    getInitialsCard() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._authorization
            }
        })
            .then((res) => {
                return this._getResponse(res);
            });
    }

    setUserInfo(item) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then((res) => {
                return this._getResponse(res);
            });
    }

    addCard(item) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then((res) => {
                return this._getResponse(res);
            });
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
        })
            .then((res) => {
                return this._getResponse(res);
            });
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: {
                    authorization: this._authorization,
                    'Content-Type': 'application/json'
                },
            })
                .then((res) => {
                    return this._getResponse(res);
                });
        }

        else {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: {
                    authorization: this._authorization,
                    'Content-Type': 'application/json'
                },
            })
                .then((res) => {
                    return this._getResponse(res);
                });
        }

    }



    setAvatar(url) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: url
            })
        })
            .then((res) => {
                return this._getResponse(res);
            });
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
        authorization: '96e4cc2d-b67a-4248-9964-1ce70190d664',
        'Content-Type': 'application/json'
    }
});