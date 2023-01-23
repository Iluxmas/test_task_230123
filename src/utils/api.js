class Api {
  constructor(url) {
    this._baseURL = url;
  }

  _checkResponse(request) {
    return request.then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Возникла ошибка при загрузке данных \nStatus: ${res.status}`);
    });
  }

  getResource(url, isLong = true) {
    url = isLong ? url + '/poll' : url;

    const newProm = fetch(`${this._URLBase}${url}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });

    return this._checkResponse(newProm);
  }

}

const apiURL = "http://localhost:3000/api/v1";

const ApiService = new Api(apiURL);

export default ApiService;