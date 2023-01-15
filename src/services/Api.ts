import axios from "axios";

class Api {
  getApiUrl(apiEndpoint: string) {
    return `https://openlibrary.org/search.json?${apiEndpoint}`;
  }

  async getData(endPoint: string) {
    return axios
      .get(this.getApiUrl(endPoint))
      .then((response) => response.data)
      .then((responseJson) => responseJson.docs)
      .catch((error) => Promise.reject(error.response));
  }

  async searchBooksByTitle(searchParam: string) {
    return this.getData(`title=${encodeURIComponent(searchParam)}`);
  }
}

export default Api;
