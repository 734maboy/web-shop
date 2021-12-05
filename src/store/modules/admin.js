import services from '../../middleware/services';
const { AdminService } = services;

export const initialState = () => ({
  users: [],
});

export const mutations = {
  SET_USERS_LIST: (state, users) => {
    state.users.push(...users);
  },

  ADD_NEW_USER: (state, user) => {
    state.users.push(user);
  },

  REMOVE_USER_FROM_LIST: (state, user) => {
    state.users.map((u, index) => {
      if (u.id == user.id) {
        state.users.splice(index, 1);
      }
    });
  },

  UPDATE_USER: (state, { user, roles} ) => {
     (user);
    state.users.map((item) => {
      if (item.id == user.id) {
        item.login = user.login;
        item.customer = Object.assign({}, user.customer);
        let role = roles.find(item => item.roleName == user.role.roleName);
        item.role = Object.assign({}, role);
        return;
      }
    });
  },
};

export const actions = {
  async getUsersList({commit}, _) {
    let users = await AdminService.getAllUsers();
     (users);
    commit('SET_USERS_LIST', users);
  },

  async createNewUser({commit, rootGetters}, user) {
    let roleId = (rootGetters['user/getListOfRoles']).find(item => item.roleName == user.role);
     (user);
    let requestData = {
      login: user.login,
      password: user.password,
      roleId: roleId.id,
    };

    if (user.role == 'Заказчик') {
      requestData.name = user.name || null;
      requestData.address = user.address || null;
      requestData.discount = user.discount || 0;
    }
    let userFromServer = await AdminService.createNewUser(requestData);
    if (userFromServer.status < 400) commit('ADD_NEW_USER', userFromServer.user);
  },

  removeUserFromList({commit}, user) {
    AdminService.deleteUser({id: user.id});
    commit('REMOVE_USER_FROM_LIST', user);
  },

  async updateUser({commit, rootGetters}, user) {
    let roles = rootGetters['user/getListOfRoles'];
     (roles);
    let userData = {
      id: user.id,
      login: user.login,
      password: user.password,
      roleId: (roles.find(item => item.roleName == user.role)).id,
    };
    if (user.role == 'Заказчик') {
      userData.name = user.name;
      userData.code = user.code;
      userData.address = user.address;
      userData.discount = user.discount;
    }
    let resp = await AdminService.updateUser(userData);
    commit('UPDATE_USER', { user: resp.user, roles} );
  },
};

export const getters = {
  getUsersList: state => state.users,
};