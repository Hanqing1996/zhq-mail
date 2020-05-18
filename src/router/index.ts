import Vue from 'vue'
import VueRouter from 'vue-router'
const MailHome =()=>import("@/views/MailHome.vue")
const MailLogin =()=>import("@/views/MailLogin.vue")
const MailCart =()=>import("@/views/MailCart.vue")
const MailUser =()=>import("@/views/MailUser.vue")
const MailCategory =()=>import("@/views/MailCategory.vue")
const MailAddressList =()=>import("@/views/MailAddressList.vue")
const MailDetail =()=>import("@/views/MailDetail.vue")
const MailList =()=>import("@/views/MailList.vue")
const MailSetting =()=>import("@/views/MailSetting.vue")
const MailAddressEdit =()=>import("@/views/MailAddressEdit.vue")
const OrderCheckout =()=>import("@/views/order/OrderCheckout.vue")
const OrderList =()=>import("@/views/order/OrderList.vue")
const OrderView =()=>import("@/views/order/OrderView.vue")


Vue.use(VueRouter)

const routes =[
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: MailHome,
    // meta 是额外添加的属性,用于在切换路由时判断 transitionName 的值是 'page-right' 还是 'page-left'
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
      //requiresAuth: true
    }
  },
  {
    path: '/address/list',
    name: 'addressList',
    component: MailAddressList,
    meta: {
      //requiresAuth: true
    }
  },
  {
    path: '/address/edit',
    name: 'addressEdit',
    component: MailAddressEdit,
    meta: {
      //requiresAuth: true
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
