import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  loggedIn: 0,
  user: null
}

const mutations = {
    increment (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    },
    SET_LOGGED_IN: (state, user) => {
        state.loggedIn = 1;
        state.user = user;
    },
    SET_LOGGED_OUT: (state) => {
        state.loggedIn = 0;
        state.user = null;
    }
}

const actions = {
    increment: ({ commit }) => commit('increment'),
    decrement: ({ commit }) => commit('decrement'),
    incrementIfOdd ({ commit, state }) {
      if ((state.count + 1) % 2 === 0) {
        commit('increment')
      }
    },
    incrementAsync ({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('increment')
          resolve()
        }, 1000)
      })
    }
}

const getters = {
    evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})