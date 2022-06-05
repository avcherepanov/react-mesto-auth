export const BASE_URL = 'https://auth.nomoreparties.co';

function getResponse(res) {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}


export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "password": password,
        "email": email
    })
  })
  .then((res) => {
    console.log(res)
    return getResponse(res)
  })
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    })
    .then((response => response.json()))
    .then((data) => {
      if (data) {
        localStorage.setItem('jwt', data.token);
        return data;
      } 
    })
    .catch(err => console.log(err))
  };

  export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then(data => data)
  }