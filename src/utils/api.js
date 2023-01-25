class Api {
  constructor(url) {
    this._baseURL = url;
  }

  getResource(url, isLong = true) {
    url = isLong ? url + '/poll' : url;

    const newProm = fetch(`${this._baseURL}${url}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });

    return newProm;
  }

}

const apiURL = "http://localhost:3000/api/v1";

const ApiService = new Api(apiURL);

export default ApiService;