import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import router from './router.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
  },
  getters: {
    idToken: state => state.idToken
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken
    }
  },
  actions: {
    signIn({ commit }, authData) {
      axios.post('/accounts:signInWithPassword?key=AIzaSyB0wNzl4OBeI_GDYBudmW6mCkRR_6mNskU',
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      }
      )
      .then(
        res => {
          commit('updateIdToken', res.data.idToken)
          router.push('/')
          console.log(res)
        }
      )
      .catch(err => console.log(err))
    },
    signUp({ commit }, authData) {
      axios.post('/accounts:signUp?key=AIzaSyB0wNzl4OBeI_GDYBudmW6mCkRR_6mNskU',
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      }
      )
      .then(
        res => {
          commit('updateIdToken', res.data.idToken)
          router.push('/')
          console.log(res)
        }
      )
      .catch(err => console.log(err))
    }
  }
})