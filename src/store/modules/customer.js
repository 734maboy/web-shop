import services from '@/middleware'
const { CustomerService } = services;


export const initialState = () => ({
  id: '',
  name: '',
  discount: 0,
  address: '',
  code: '',
  orders: [],
});

export const mutations = {
  SET_CUSTOMER_DATA: (state, data) => {
    state.id = data.id;
    state.name = data.name;
    state.discount = data.discount;
    state.address = data.address;
    state.code = data.code;
    state.orders = data.orders;
  },

  ADD_ORDER: (state, order) => {
    state.orders.push(order);
  },


};

export const actions = {
  async createOrder({rootGetters, commit, state}) {
    let cartItems = rootGetters['catalog/getCart'];
    let resp = await CustomerService.createOrder( state.id, cartItems.map(item => {
      return {
        productsCount: item.count,
        productPrice: item.price,
        productId: item.id,
      }
    }));
  },

};  

export const getters = {
  getOrders: state => state.orders,
};