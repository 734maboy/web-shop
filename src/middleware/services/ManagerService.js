import { fillFormData } from '../../mixins/mixins';

export default {
  async getAllOrders() {
    let resp = (await this.apiClient.post('getOrders')).data;
    return resp;
  },

  acceptOrder(data) {
    let formData = new FormData();

    fillFormData(formData, data);

    this.apiClient.post('acceptOrder', formData);
  },

  closeOrder(data) {
    let formData = new FormData();


    fillFormData(formData, data);

    this.apiClient.post('closeOrder', formData);

  },

  async getStatuses() {
    let resp = (await this.apiClient.post('getOrderStatuses')).data;
    return resp;
  },
};