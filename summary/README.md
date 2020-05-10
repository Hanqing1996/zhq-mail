#### !!state.userInfo
```
 getters: {
     isLogin: state => {
       return !!state.userInfo
     }
  }
```
等效于
```
 getters: {
     isLogin: state => {
       if(state.userInfo)
           return true
       else 
           return false
     }
  }
```

#### $fetch
```
// src/my-property.d.ts

import Vue from 'vue'
declare module 'vue/types/vue' {
    interface Vue {
        $fetch: Fetch
    }
}
```
```
// main.ts
import fetch from './api/fetch'
Vue.prototype.$fetch = fetch
```
```
// LoginForm.vue
this.$fetch('getCode', {username: this.userName}).then((res: any) => {
    ......
})
```

#### $NProgress
```
// src/my-property.d.ts
import nProgress from "nprogress";

declare module 'vue/types/vue' {
    interface Vue {
        $NProgress:nProgress.NProgress
    }
}
```
其它同上

#### 异步组件
* 配合 webpack 的 code splitting 使用，实现按需从服务器加载模块
* yarn build 后 app.js 的体积会减小
* [vue 异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)
* [vue-router 路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97)
```
// router/index.ts
const MailHome =()=>import("@/views/MailHome.vue")
const MailLogin =()=>import("@/views/MailLogin.vue")
const MailCart =()=>import("@/views/MailCart.vue")
const MailUser =()=>import("@/views/MailUser.vue")
```

#### 图片懒加载
1. 安装 vue-lazyload
2. 全局引入
```
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
```
3. 使用 
```
// 将 :scr 替换成 v-lazy 即可 
<img v-lazy="list.category_img">
```

#### vue-router
* 命名路由
> 把路由导航到 /user/123 路径。
```
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```
```
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
等价于
<router-link to="/user/123">User</router-link>
```
* [动态路由匹配](https://router.vuejs.org/guide/essentials/dynamic-matching.html)
```
/user/:username 匹配 /user/evan
$route.params={username:evan}
```
* [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)
```
// MailCategory.vue
beforeRouteEnter(to:any, from:any, next:any){
    // 判断是路由切换还是刷新
    if(!from.name){
        console.log('你刷新了');
    } else{
        console.log('你是通过路由切换来到这里的');
    }
    next()
}
```


#### 监听路由
```
@Watch('$route')
onRouteChanged(to: any, from: any) {
    // 刷新时不需要过渡
    if (!from.name) {
        this.transitionName = ''
        return
    }
    if (to.meta.index && from.meta.index) {
        this.transitionName = to.meta.index < from.meta.index ? 'page-right' : 'page-left'
    }
}
```

#### 路由切换 and 刷新
1. 过渡效果的差异
> 比如 App.vue 页面中
```
// 监视路由变化
@Watch('$route')
onRouteChanged(to: any, from: any) {
    // 刷新时不需要过渡
    if (!from.name) {
        this.transitionName = ''
        return
    }
    if (to.meta.index && from.meta.index) {
        this.transitionName = to.meta.index < from.meta.index ? 'page-right' : 'page-left'
    }
}
```
2. [数据获取的差异](https://router.vuejs.org/zh/guide/advanced/data-fetching.html#%E6%95%B0%E6%8D%AE%E8%8E%B7%E5%8F%96)
* 路由切换
    * 没有加载状态（约定俗成）
    * 在导航转入新的路由前获取数据
* 刷新
    * 有加载状态（约定俗成）
    * 先完成导航，然后在接下来的组件生命周期钩子中获取数据。
> 具体做法是操纵<code>beforeRouteEnter</code>以控制数据获取是在导航结束后（即进入组件生命周期），还是导航过程中实现。

#### 关于 viewLoading，
1. viewLoading 表示页面处于加载状态（Skeleton）
2. main.ts 中，设置了在进入新路由（刷新 or 切换路由）前，都会重置 viewLoading
3. 某个页面在获取到数据后，修改 viewLoading,表示"数据已获取，加载状态结束"

#### 关于 NProgress
1. NProgress.start() 表示开启进度条，NProgress.done() 表示关闭进度条，
2. main.ts 中，设置了在进入新路由（刷新 or 切换路由）前，都会开启 NProgress
3. 某个页面在获取到数据后，<code>this.$NProgress.done()</code> 表示"数据已获取，进度100%"

#### beforeRouteEnter 的 next 在什么时候执行
> "用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。"
```
beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => vm.getNavList())
}

getNavList() {
    console.log('getNavList');
}

created(){
    console.log('created');
}
```
执行结果
```
created
getNavList
```
说明 next 是在 created 之后执行的


#### 页面跳转
* category 页面跳转到 List 页面
```
// CategoryGroup.vue
<router-link
        v-for="product in products"
        :key="product.category_id"
        class="product"
        tag="div"
        :to="{name: 'list', params: {id: product.category_id}}">
    <a class="exposure item">
        <div class="img">
            <img class="big" v-lazy="product.img_url">
        </div>
        <div class="name">{{product.product_name}}</div>
    </a>
</router-link>
```
```
// router/index.ts
  {
    path: '/commodity/list/:id',
    name: 'list',
    component: MailList
  }
```
* 注意，$fetch 是向 rap2 发送请求以获取数据，不是用于页面跳转的
```
this.$fetch('commodity', {
    category_id:this.$route.params.id
}).then(res => {
    this.setList(res)
})
```
#### v-html
```
<p v-html="product.product_desc">
```

#### 防 XSS 攻击
* [dompurify](https://github.com/cure53/DOMPurify)
```
import DOMPurify from 'dompurify';

this.commodityList = res.data.list.map((item:any)=>{return{...item,product_desc:DOMPurify.sanitize(item.product_desc)}})

<p v-html="product.product_desc">
```

#### [Swiper.js](https://swiperjs.com/)
* slidesPerView:同时预览多个
```
// MailHome.vue
this.$nextTick(() => {
    this.homeSwiper = new Swiper('.swiper-container', {
        // 一行展示个数
        slidesPerView: this.slidesPerView,
        freeMode: true
    })
})
```
* pagination:分页
```
// MailDetail.vue

```





    

