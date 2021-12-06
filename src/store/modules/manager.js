import services from "../../middleware/services";
const { ManagerService } = services;


export const initialState = () => ({
  orders: null,
  statuses: [],
});

export const mutations = {
  SET_ORDERS_LIST: (state, orders) => {
    state.orders = [];
    state.orders.push(...orders);
  },

  SET_STATUSES_LIST: (state, statuses) => {
    state.statuses.push(...statuses);
  },

  ACCEPT_ORDER: (state, { orderId, shipmentDate }) => {
    let status = state.statuses.find(item => item.name === 'Выполняется');
    state.orders.map(item => {
      if (item.id == orderId) {
        item.shipmentDate = shipmentDate;
        item.orderStatus = Object.assign({}, status);
        return;
      }
    });
  },

  CLOSE_ORDER: (state, orderId) => {
    let status = state.statuses.find(item => item.name == 'Выполнен');
    state.orders.map(item => {
      if (item.id == orderId) {
        item.orderStatus = Object.assign({}, status);
        return;
      }
    });
  },
};

export const actions = {
  async getAllOrders({commit}) {
    let orders = await ManagerService.getAllOrders();
    commit('SET_ORDERS_LIST', orders);
  },

  acceptOrder({commit}, data) {
    commit('ACCEPT_ORDER', data);
    ManagerService.acceptOrder(data);
  },

  closeOrder({commit}, orderId) {
    commit('CLOSE_ORDER', orderId);
    ManagerService.closeOrder( { orderId, });
  }, 
  async getStatuses({commit}) {
    let resp = await ManagerService.getStatuses();
    commit('SET_STATUSES_LIST', resp);
  },
};

export const getters = {
  getAllOrders: state => state.orders,
};

