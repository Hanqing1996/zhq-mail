import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/assets/css/reset.css'
import '@/assets/css/layout.css'
import '@/assets/fonts/iconfont.css'
import fetch from './api/fetch'
import Icon from "@/components/Icon.vue";
Vue.config.productionTip = false

Vue.component('Icon',Icon)

Vue.prototype.$fetch = fetch

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
