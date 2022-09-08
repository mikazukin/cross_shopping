import Vue from 'vue';
import Router from 'vue-router'
import SignIn from './components/SignIn.vue'
import SignUp from './components/SignUp.vue'
import Cart from './components/Cart.vue'

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {path: '/sign_up', component: SignUp},
    {path: '/sign_in', component: SignIn},
    {path: '/', component: Cart}
  ]
});