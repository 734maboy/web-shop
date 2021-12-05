import webClient from '@/middleware/WebClient';

const NOT_LOGIN_META = 'notlogged';
const CUSTOMER_META = 'customer';
const NOT_CUSTOMER_META = 'notcustomer';
const FOR_ALL_META = 'all';
const NOT_ADMIN = 'notadmin';

const lastRouteTo = {};
const lastRouteFrom = {};

function isEmpty(object) {
  return !Object.keys(object).length;
};

export default function (store) {
  return (to, from, next) => {
		const isLogged = store.getters['user/isLogged'];
		const isAdmin = store.getters['user/isAdmin'];
		const isManager = store.getters['user/isManager'];
    const token = store.getters['user/getToken'];
			
    if (token) {
			webClient.login(token);
		}

		

    const isPing = !!(to.path === '/ping' && lastRouteTo);
		const { meta:   { access }, path } = isPing ? lastRouteTo : to;


		if ((isEmpty(lastRouteTo) && to.name === 'SignIn') || to.name !== 'SignIn') {
			Object.assign(lastRouteTo, to); 
			Object.assign(lastRouteFrom, from);
		}
		console.log(access);
    if (!isLogged && (access === CUSTOMER_META || access === NOT_ADMIN || access === NOT_CUSTOMER_META)) {
      return next('/SignIn');
    }
		else if(isLogged && (isAdmin || isManager) && access === CUSTOMER_META) {
			return next('/edit-users');
		} 
		else if (isAdmin && access === NOT_ADMIN) {
			return next('/edit-users');
		}
		else if (isAdmin && access === NOT_ADMIN) {
			return next('/edit-users');
		}
		else if (isLogged && (!isAdmin && !isManager) && access === NOT_CUSTOMER_META) {
			return next('/user-orders');
		}
		else if (isLogged && access === NOT_LOGIN_META) {
			return next('/');
		}
		
    return next((isPing && path) || true);
  };
};
