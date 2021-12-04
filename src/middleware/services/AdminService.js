import { fillFormData } from "../../mixins/mixins";

export default {
  async getAllUsers() {
    let resp = (await this.apiClient.post('getUsers')).data;
    return resp;
  },

  async createNewUser(user) {
    let formData = new FormData();

    fillFormData(formData, user);

    let resp = (await this.apiClient.post('createUser', formData)).data;
    console.log(resp);
    return resp;
  },

  deleteUser(data) {
    let formData = new FormData();

    fillFormData(formData, data);
    
    this.apiClient.post('deleteUser', formData);
  },

  async updateUser(data) {
    let formData = new FormData();

    fillFormData(formData, data);

    let resp = (await this.apiClient.post('updateUser', formData)).data;
    console.log(resp);
    return resp;
  },
};