import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules';
import RStore from './RStore';
import WebClient from '../middleware/WebClient';
import initialModules from './initialModules';

Vue.use(Vuex)

const initialState = () => ({
    rules: {
		
      required: v => {
        const value = (typeof v === 'number') ? v.toString() : v;
        return (!!value && !!value.length) || 'Поле обязательно для заполнения';
      },
      
      min: type => {
        const message = 'Введите больше символов';
        switch(type) {
          case 'password': 
            return v => (v + '').length >= 3 || message;
          case 'login': 
            return v => (v + '').length >= 3 || message;
          case 'name': 
            return v => (v + '').length >= 3 || message;
          case 'address': 
            return v => (v + '').length >= 3 || message;
  
          default:
            return true;
        };
      },

      max: type => {
        const message = 'Недопустимое кол-во символов';
        switch(type) {
          case 'password': 
            return v => (v + '').length <= 20 || message;
          case 'login': 
            return v => (v + '').length <= 20 || message;
          case 'name': 
            return v => (v + '').length <= 30 || message;
          case 'address': 
            return v => (v + '').length <= 30 || message;
  
          default:
            return true;
        };
      }
    },
});

export default new Vuex.Store({
  state: initialState,
  getters: {
		getRules: state => state.rules,
  },
  mutations: {
    UNSET_DATA: state => state = initialState(),
  },
  actions: {
    unsetUserData({ commit, dispatch }) {
      Object.keys(modules).forEach(module => {
        commit(`${module}/UNSET_DATA`);
      });
      commit('UNSET_DATA');
      dispatch('saveToLocaleStorage');
			WebClient.logout();
		},

    saveToLocaleStorage(_, data) {
      RStore.initState(data);
    },
  },
  modules: initialModules(modules),
})
