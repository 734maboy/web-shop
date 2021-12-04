import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('../views/Catalog')
  },
  {
    path: '/user-orders',
    name: 'UserOrders',
    component: () => import('../views/UserOrders')
  },
  {
    path: '/edit-products',
    name: 'EditProducts',
    component: () => import('../views/EditProducts')
  },
  {
    path: '/edit-users',
    name: 'EditUsers',
    component: () => import('../views/EditUsers')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
