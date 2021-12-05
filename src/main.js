import Vue from 'vue'
import App from './App.vue'
import routerInit from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import WebClient from './middleware/WebClient';

import RStore from './store/RStore';

Vue.config.productionTip = false
const router = routerInit(store);

WebClient.$router = router;
WebClient.$store = store;

RStore.subscribe('afterUpdate', state => {
  store.dispatch(state ? 'user/loginFromState' : 'unsetUserData', state);
  router.replace('/ping').catch(e => console.log(e));
});

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
