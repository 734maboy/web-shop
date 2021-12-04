import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import WebClient from './middleware/WebClient';

Vue.config.productionTip = false

Vue.config.productionTip = false
// const router = routerInit(store);

WebClient.$router = router;
WebClient.$store = store;

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
