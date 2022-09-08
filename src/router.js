import Vue from 'vue';
import Router from 'vue-router'
import SignIn from './components/SignIn.vue'
import SignUp from './components/SignUp.vue'
import Cart from './components/Cart.vue'
import store from './store.js'

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/sign_up',
      component: SignUp,
      beforeEnter(to, from, next) {
        if(store.getters.idToken) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/sign_in',
      component: SignIn,
      beforeEnter(to, from, next) {
        if(store.getters.idToken) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/',
      component: Cart,
      beforeEnter(to, from, next) {
        if(store.getters.idToken) {
          next()
        } else {
          next('/sign_in')
        }
      }
    }
  ]
});