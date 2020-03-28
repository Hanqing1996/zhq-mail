import Vue from 'vue'
import VueRouter from 'vue-router'
import MailHome from "@/views/MailHome.vue";
import MailLogin from "@/views/MailLogin.vue";
import MailCart from "@/views/MailCart.vue";
import MailUser from "@/views/MailUser.vue";
import MailCategory from "@/views/MailCategory.vue";
import MailAddressList from "@/views/address/MailAddressList.vue";
import MailDetail from "@/views/commodity/MailDetail.vue";
import MailList from "@/views/commodity/MailList.vue";
import MailSetting from "@/views/MailSetting.vue";
import MailAddressEdit from "@/views/address/MailAddressEdit.vue";
import OrderCheckout from "@/views/order/OrderCheckout.vue";
import OrderList from "@/views/order/OrderList.vue";
import OrderView from "@/views/order/OrderView.vue";


Vue.use(VueRouter)

const routes =[
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'home',
    component: MailHome,
    meta: {
      index: 1
    }
  },
  {
    path: '/login',
    name: 'login',
    component: MailLogin,
  },
  {
    path: '/category',
    name: 'category',
    component: MailCategory,
    meta: {
      index: 2
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: MailCart,
    meta: {
      index: 3
    }
  },
  {
    path: '/user',
    name: 'user',
    component: MailUser,
    meta: {
      index: 4
    }
  },
  {
    path: '/commodity/list/:id',
    name: 'list',
    component: MailList
  },
  {
    path: '/commodity/detail/:id',
    name: 'detail',
    component: MailDetail
  },
  {
    path: '/user/set',
    name: 'set',
    component: MailSetting,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/address/list',
    name: 'addressList',
    component: MailAddressList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/address/edit',
    name: 'addressEdit',
    component: MailAddressEdit,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/order/checkout',
    name: 'orderCheckout',
    component: OrderCheckout,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/order/list',
    name: 'orderList',
    component: OrderList,
    meta: {
      // requiresAuth: true
    }
  },
  {
    path: '/order/view/:id',
    name: 'orderView',
    component: OrderView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
