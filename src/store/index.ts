import Vue from 'vue'
import Vuex from 'vuex'
import fetch from '@/api/fetch.ts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // UI数据
    viewLoading: false,//
    // ViewLoading 为复用数据，每次跳转到新路由前都会被置为 true
    // 用户数据
    userInfo:null
  },
  getters: {
    isLogin: state => {
      return !!state.userInfo
    }
  },
  mutations: {
    setViewLoading (state, isLoading) {
      state.viewLoading = isLoading
    },
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
