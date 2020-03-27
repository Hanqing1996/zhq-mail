import Vue from 'vue'
import Vuex from 'vuex'
import fetch from '@/api/fetch.ts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:null
  },
  getters: {
    isLogin: state => {
      return !!state.userInfo
    }
  },
  mutations: {
    setUserInfo (state, info) {
      state.userInfo = info
    }
  },
  actions: {
    getUserInfo ({ commit }) {
      fetch('userInfo',{}).then((res:any) => {
        commit('setUserInfo', res.data.user)
      })
    }
  },
  modules: {
  }
})
