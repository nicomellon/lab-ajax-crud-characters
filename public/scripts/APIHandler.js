console.log("APIhandler.js script loaded");

class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getFullList = () => axios.get(`${this.BASE_URL}/characters`);

  getOneRegister = (id) => axios.get(`${this.BASE_URL}/characters/${id}`);

  createOneRegister = async (characterInfo) =>
    axios.post(`${this.BASE_URL}/characters`, characterInfo);

  updateOneRegister = (id, updatedInfo) =>
    axios.put(`${this.BASE_URL}/characters/${id}`, updatedInfo);

  deleteOneRegister = (id) => axios.delete(`${this.BASE_URL}/characters/${id}`);
}
