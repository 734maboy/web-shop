import services from "@/middleware";
import WebClient from "../../middleware/WebClient";
const { UserService } = services;

export const initialState = () => ({
  isLogged: false,
  isManager: false,
  isAdmin: false,
  token: '',
  userId: '',
  userlogin: '',
  userRoleId: '',
  userRoleName: '',
  roles: [],
});

export const mutations = {
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },

  SET_USER_DATA: (state, data) => {
    state.isLogged = true;
    state.isAdmin = data.isAdmin;
    state.isManager = data.isManager;
    state.token = data.token;
    state.userId = data.id;
    state.userlogin = data.login;
    state.userRoleId = data.roleId;
    state.userRoleName = data.role;
  },
};

export const actions = {
  async getListOfRoles({ commit }) {
    let roles = await UserService.getRoles();
    commit('SET_ROLES', roles);
  },

  async requestToCreateNewUser({state}, userInfo) {
    let resp = await UserService.createUser({
      login: userInfo.login,
      password: userInfo.password,
      roleId: (state.roles.find(r => r.roleName == "Заказчик")).id,
      name: [userInfo.surname, userInfo.name, userInfo.fname].join(' '),
      address: userInfo.address,
      discount: 0,
    });
    return resp;
  },

  

  loginFromState({commit, dispatch}, data) {
    WebClient.login(data.user.token);
    commit('SET_USER_DATA', data.user);
    commit('customer/SET_CUSTOMER_DATA', data.customer, { root: true });
    commit('SET_ROLES', data.roles);
    dispatch('catalog/getAllProducts', {} ,{ root: true });
    dispatch('catalog/getAllCategories', {} ,{ root: true });
    if (data.user.role != 'Заказчик') {
      commit('customer/UNSET_DATA', null, {root: true});
      dispatch('manager/getAllOrders', {} ,{ root: true });
      dispatch('admin/getUsersList', {} ,{ root: true });
    }
  },

  logOut: ({ dispatch }) => dispatch('unsetUserData', null, { root: true }),

  async requestToLogInUser({commit, dispatch, getters}, logInfo) {
    dispatch('getListOfRoles');
    let resp = await UserService.logInUser(logInfo);
    if (resp.message) return resp; else {
      WebClient.login(resp['access_token']);
      
      commit('SET_USER_DATA', {
        token: resp['access_token'],
        id: resp.id,
        login: resp.login,
        roleId: resp.roleId,
        role: resp.role,
        isManager: resp.role == 'Менеджер' ? true : false,
        isAdmin: resp.role == 'Админ' ? true : false,
      });
      if (resp.role == 'Заказчик') commit('customer/SET_CUSTOMER_DATA', {
        id: resp.customerId,
        name: resp.name,
        discount: resp.discount,
        address: resp.address,
        code: resp.code,
        orders: resp.orders,
      }, { root: true });
      else {
        dispatch('admin/getUsersList', {}, {root: true});
        dispatch('manager/getAllOrders', {} ,{ root: true });
      }
      dispatch('catalog/getAllProducts', {} ,{ root: true });
      dispatch('catalog/getAllCategories', {} ,{ root: true });
      dispatch('saveToLocaleStorage', {
        user: {
          isLogged: true,
          isManager: resp.role == 'Менеджер' ? true : false,
          isAdmin: resp.role == 'Админ' ? true : false,
          token: resp['access_token'],
          id: resp.id,
          login: resp.login,
          roleId: resp.roleId,
          role: resp.role,
        },
        customer: {
          id: resp.customerId,
          name: resp.name,
          discount: resp.discount,
          code: resp.code,
          orders: resp.orders,
        },
        roles: getters['getListOfRoles'],

      }, {root: true});
      

      return {};
    }
  },
};

export const getters = {
  getListOfRoles: state => state.roles,
  getUserInfo: state => ({

  }),
  isLogged: state => state.isLogged,
  isManager: state => state.isManager,
  isAdmin: state => state.isAdmin,
  getToken: state => state.token,
};
