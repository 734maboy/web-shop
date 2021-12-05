
import { fillFormData } from '../../mixins/mixins';

export default {
  
  async getRoles() {
    let response;
    response = (await this.apiClient.post('getRoles')).data;
    return response; 
  },

  async createUser(userInfo) {
    let formData = new FormData();
    fillFormData(formData, userInfo);

    let resp = (await this.apiClient.post('createUser',  formData )).data;
    return resp;
  },

  async logInUser(logInfo) {
    let formData = new FormData();
    fillFormData(formData, logInfo);
    let resp = (await this.apiClient.post('getToken', formData)).data;
    return resp;
  },


};