import services from "../../middleware/services";
const { ManagerService } = services;


export const initialState = () => ({
  orders: null,
});

export const mutations = {
  SET_ORDERS_LIST: (state, orders) => {
    state.orders = [];
    state.orders.push(...orders);
    console.log(state.orders);
  },
};

export const actions = {
  async getAllOrders({commit}) {
    let orders = await ManagerService.getAllOrders();
    commit('SET_ORDERS_LIST', orders);
  },

  acceptOrder({commit}, data) {
    ManagerService.acceptOrder(data);
  },

  closeOrder({commit}, orderId) {
    ManagerService.closeOrder( { orderId, });
  }
};

export const getters = {
  getAllOrders: state => state.orders,
};

