import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules';
import initialModules from './initialModules';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
  },
  getters: {
		getRules: state => state.rules,
  },
  mutations: {
  },
  actions: {
  },
  modules: initialModules(modules),
})
