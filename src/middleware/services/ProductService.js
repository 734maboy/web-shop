import { fillFormData } from "../../mixins/mixins";

export default {

  async getAllProducts() {
    let resp = (await this.apiClient.post('getProducts')).data;
    return resp;
  },

  async getAllCategories() {
    let resp = (await this.apiClient.post('getCategories')).data;
    return resp;
  },

  async createNewProduct(product) {
    let formData = new FormData();

    fillFormData(formData, product)

    let resp = (await this.apiClient.post('createProduct', formData)).data;
    return resp;
  },

  updateProduct(product) {
    let formData = new FormData();

    fillFormData(formData, product);

    this.apiClient.post('updateProduct', formData);
  },

  async deleteProduct(product) {
    let formData = new FormData();
    fillFormData(formData, product);
    let resp = (await this.apiClient.post('deleteProduct', formData)).data;
    return resp;
  }

}