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
* [文档] 
```
// router/index.ts
const MailHome =()=>import("@/views/MailHome.vue")
const MailLogin =()=>import("@/views/MailLogin.vue")
const MailCart =()=>import("@/views/MailCart.vue")
const MailUser =()=>import("@/views/MailUser.vue")
```