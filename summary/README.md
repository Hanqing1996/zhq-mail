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
* 路由切换
> 由路由获取数据
* 刷新
> 由组件获取数据
```
beforeRouteEnter(to: any, from: any, next: any) {
    if (!from.name) {
        // 刷新
        console.log('你刷新了');
        next((vm: any) => vm.getList())
    } else {
        // 路由切换
        console.log('你切换路由了');
        fetch('category', {}).then(res => {
            next((vm: any) => vm.setList(res))
        })
    }
}
```