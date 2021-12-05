import Vue from 'vue'
import VueRouter from 'vue-router'
import initListners from './initListners';
import listners from './listners';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      access: 'all',
    },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue'),
    meta: {
      access: 'notlogged'
    },
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue'),
    meta: {
      access: 'notlogged'
    },
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('../views/Catalog'),
    meta: {
      access: 'customer'
    },
  },
  {
    path: '/user-orders',
    name: 'UserOrders',
    component: () => import('../views/UserOrders'),
    meta: {
      access: 'notadmin'
    },
  },
  {
    path: '/edit-products',
    name: 'EditProducts',
    component: () => import('../views/EditProducts'),
    meta: {
      access: 'notcustomer'
    },
  },
  {
    path: '/edit-users',
    name: 'EditUsers',
    component: () => import('../views/EditUsers'),
    meta: {
      access: 'notcustomer'
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default initListners(router, listners);