import services from '@/middleware'
const { CustomerService } = services;


export const initialState = () => ({
  id: '',
  name: '',
  discount: 0,
  address: '',
  code: '',
  orders: null,
});

export const mutations = {
  SET_CUSTOMER_DATA: (state, data) => {
    console.log(data.orders);
    state.id = data.id;
    state.name = data.name;
    state.discount = data.discount;
    state.address = data.address;
    state.code = data.code;
    state.orders = [];
    state.orders.push(...data.orders);
  },

  ADD_ORDER: (state, order) => {
    state.orders.push(order);
  },

  REMOVE_ORDER: (state, orderId) => {
    state.orders.forEach( (o, i) => {
      if (o.id == orderId) {
        state.orders.splice(i, 1);
        return;
      }
    });
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
    commit('ADD_ORDER', resp.order);
     (state.orders);
  },

  async getAllOrders() {
    // let resp = await ()
  },

  deleteOrder({commit}, orderId) {
    CustomerService.deleteOrder(orderId);
    commit('REMOVE_ORDER', orderId);
  },

};  

export const getters = {
  getOrders: state => state.orders,
};