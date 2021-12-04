import { fillFormData } from '../../mixins/mixins';

export default {
  async createOrder(customerId, data) {
    let formData = new FormData();
    console.log(data, customerId);
    formData.append('items', JSON.stringify(data));
    formData.append('customerId', customerId);
    let resp = (await this.apiClient.post('createOrder', formData)).data;
    console.log(resp);
    // return resp;
  }

};