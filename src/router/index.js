import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'

import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail'
import Search from "@/views/Search"
import MyAccount from "@/views/MyAccount"
import Checkout from "@/views/Checkout"
import Success from "@/views/Success"
import Payment from "@/views/Payment"
import Delivery from "@/views/Delivery";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/log-in',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/cart/success',
    name: 'Success',
    component: Success
  },
  {
    path: '/cart/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  },
  {
    path: '/delivery',
    name: 'Delivery',
    component: Delivery
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/shoes',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/shoes/:shoes_slug',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/article/:article_slug',
    name: 'ProductArticleList',
    component: () => import('../views/ProductList.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({name: 'Login', query: {to: to.path}})
  } else {
    next()
  }
})

export default router
