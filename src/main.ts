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
Vue.config.productionTip = false
NProgress.configure({ showSpinner: false })

Vue.component('Icon',Icon)
Vue.component('Nav',Nav)

Vue.prototype.$fetch = fetch
Vue.prototype.$NProgress = NProgress

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
