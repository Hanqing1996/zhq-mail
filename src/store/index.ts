import Vue from 'vue'
import Vuex from 'vuex'
import fetch from '@/api/fetch.ts'
import addressModule from "@/store/modules/address";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // UI数据
    viewLoading: false, // ViewLoading 为复用数据，每次跳转到新路由前都会被置为 true
    transitionName:'page-left', //
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
    setTransitionName (state,transitionName){
      state.transitionName = transitionName
    },
    setUserInfo (state, info) {
      state.userInfo = info
    }
  },
  actions: {
    // 数据是异步获取的，所以放在 actions 中
    getUserInfo ({ commit }) {
      fetch('userInfo',{}).then((res:any) => {
        commit('setUserInfo', res.data.user)
      })
    }
  },
  modules: {
    address:{
      namespaced:true,
      ...addressModule
    }
  }
})
