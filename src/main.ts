import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import 'nprogress/nprogress.css'
import '@/assets/css/reset.css'
import '@/assets/css/layout.css'
import '@/assets/fonts/iconfont.css'
import fetch from './api/fetch'
import NProgress from 'nprogress'
import Icon from "@/components/Icon.vue";
import Nav from "@/components/Nav.vue";
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false
NProgress.configure({ showSpinner: false })
Vue.use(VueLazyload)

Vue.component('Icon',Icon)
Vue.component('Nav',Nav)

Vue.prototype.$fetch = fetch
Vue.prototype.$NProgress = NProgress

// 在每次切换路由或刷新页面之前，将 ViewLoading 重置为 true，并显示进度条
router.beforeEach((to, from, next) => {

  store.commit('setViewLoading', true)
  NProgress.start()
  // if (to.meta.requiresAuth && !store.getters.isLogin) {
  //   next({
  //     name: 'login',
  //     query: { redirect: to.fullPath }
  //   })
  // } else {
  //   next()
  // }

  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
