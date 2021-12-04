import services from "@/middleware";
import WebClient from "../../middleware/WebClient";
const { UserService } = services;

export const initialState = () => ({
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
    state.userId = data.id;
    state.userlogin = data.login;
    state.userRoleId = data.roleId;
    state.userRoleName = data.role;
  },
};

export const actions = {
  async getListOfRoles({ commit }) {
    let roles = await UserService.getRoles();
    console.log(roles);
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

  async requestToLogInUser({commit, dispatch}, logInfo) {
    let resp = await UserService.logInUser(logInfo);
    if (resp.message) return resp; else {
      commit('SET_USER_DATA', {
        id: resp.id,
        login: resp.login,
        roleId: resp.roleId,
        role: resp.role,
      });
      if (resp.role == 'Заказчик') commit('customer/SET_CUSTOMER_DATA', {
        id: resp.customerId,
        name: resp.name,
        discount: resp.discount,
        address: resp.address,
        code: resp.code,
        orders: resp.orders,
      }, { root: true });
        else dispatch('admin/getUsersList', {}, {root: true});

      dispatch('catalog/getAllProducts', {} ,{ root: true });
      dispatch('catalog/getAllCategories', {} ,{ root: true });

      return {};
    }
  },
};

export const getters = {
  getListOfRoles: state => state.roles,
  getUserInfo: state => ({

  }),
};
