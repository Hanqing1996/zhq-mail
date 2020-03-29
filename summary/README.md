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