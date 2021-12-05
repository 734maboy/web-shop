import { fillFormData } from '../../mixins/mixins';

export default {
  async createOrder(customerId, data) {
    let formData = new FormData();
    formData.append('items', JSON.stringify(data));
    formData.append('customerId', customerId);
    let resp = (await this.apiClient.post('createOrder', formData)).data;
    return resp;
  },

  deleteOrder(orderId) {
    let formData = new FormData();
    formData.append('orderId', orderId)
    this.apiClient.post('deleteOrder', formData);
  },

};