let host = ''
let {NODE_ENV, VUE_APP_API} = process.env
if (NODE_ENV === 'development' || (NODE_ENV === 'production' && VUE_APP_API === 'rap')) {
    host = 'http://rap2.taobao.org/app/mock/248336/'
}

const url = {
    login: '/user/login',
    logout: '/user/logout',
    userInfo: '/user/userInfo',
    getCode: '/user/getCode',
    navList: '/home/navList',
    homePage: '/home/homePage',
    category: '/home/category',
    commodity: '/home/commodityList',
    forRecommend: '/home/forRecommend',
    productView: '/product/productView',
    recommend: '/product/recommend',
    estDelivery: '/product/estDelivery',
    cartIndex: '/cart/index',
    cartSelect: '/cart/selcart',
    cartEdit: '/cart/edit',
    cartAdd: '/cart/add',
    cartDelete: '/cart/del',
    cartSelService: '/cart/selService',
    cartCount: '/cart/count',
    addressList: '/address/list',
    addressAdd: '/address/add',
    addressSave: '/address/save',
    addressView: '/address/view',
    addressDel: '/address/del',
    addressAll: '/address/all',
    addressRegion: '/address/region',
    orderCheckout: '/order/checkout',
    orderList: '/order/list',
    orderView: '/order/view'
}

Object.keys(url).forEach(key => {
    url[key] = host + url[key]
})

export default url
