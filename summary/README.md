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
this.$nextTick(() => {
    new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
    })
})
```
* [Lazy Loading](https://swiperjs.com/api/#lazy)
```
// MailDetail.vue
this.$nextTick(() => {
    new Swiper('.swiper-container', {
        // Disable preloading of all images
        preloadImages: false,
        // Enable lazy loading
        lazy: true
    })
})
```
* 记得销毁
```
destroyed(){
    this.detailSwiper&&this.detailSwiper.removeAllSlides()
    this.$NProgress.remove()
}
```


#### 为什么要先处理（源数据），再赋值（this.xxx=...）
```
//规范：先处理源数据，再赋值

// 处理
let descTabsView = res.data.view_content.descTabsView.descTabsView
descTabsView.forEach((item: any) => {

    let tabContent = item.tabContent
    if (tabContent.length > 3) {
        item.showTabContent = tabContent.slice(0, 3)
        item.moreTabContent = tabContent.slice(3)

    } else {
        item.showTabContent = tabContent
    }
    item.showMore = false
})

// 赋值
this.descTabsView = descTabsView

this.productData = res.data
this.galleryView = res.data.view_content.galleryView.galleryView
this.titleView = res.data.view_content.titleView.titleView
this.canJoinActs = res.data.view_content.titleView.titleView.canJoinActs[0]
this.commentView = res.data.view_content.commentView.commentView
```
* this.person 可以检测到已有属性 name 的变化，从而做出响应
```
<div @click="updatePerson">update</div>
<div>{{person}}</div>       // {name:'libai'} 变为 {name:'zhangfei'}，即UI数据也更新了

export default class MailDetail extends Vue {
    person=null

    created(){
        let obj={name:'libai'}
        this.person=obj
    }

    updatePerson(){
        this.person.name='zhangfei'
        console.log(this.person);// {name:'zhangfei'},说明内存中的数据更新了
    }
}
```
* this.person 不能检测到新增属性 age 的变化，因而不能做出响应
```
<div @click="updatePerson">update</div>
<div>{{person}}</div> // {name:'libai',age:12} 不变，即UI数据没有更新

export default class MailDetail extends Vue {
    person=null

    created(){
        let obj={name:'libai'}
        this.person=obj
        obj['age']=12
    }

    updatePerson(){
        this.person.age=100
        console.log(this.person); // {name:'libai',age:100},说明内存中的数据更新了
    }
}
```


#### 锁死
> weight 是 obj.child.son 的新增属性
```
<div @click="updateSon">update</div>
<div>{{person}}</div> // {name:'lilili',weight:1000} 不变

export default class MailDetail extends Vue {
    lock=null
    person=null

    created(){
            let obj={child:{son:{name:'lilili'}}}
            this.lock=obj.child // 把这句去掉或放在最后，son.weight 的变化就可以响应了
            obj.child.son.weight=1000
            console.log(this.lock)    
            /* this.lock.son.weight 不具有 set,set 属性
            son: Object
                name: "lilili"
                weight: "900"
                get name: ƒ reactiveGetter()
                set name: ƒ reactiveSetter(newVal)
            get son: ƒ reactiveGetter()
            set son: ƒ reactiveSetter(newVal)
            */    
            this.person=obj.child.son
            console.log(this.person)
            /* this.person.weight 不具有 set,get 属性
            name: "lilili"
            weight: 1000
            get name: ƒ reactiveGetter()
            set name: ƒ reactiveSetter(newVal)
            */
    }

    updatePerson(){
        this.person.weight='900'
        console.log(this.person); // {name:'lilili',weight:900},说明内存中的数据更新了
    }
}
```    
* 应该这么理解
1. 在 this.lock=obj.child 后，我们又为 obj.child.son 添加了 weight 属性。由于是在原内存地址上做的改动，this.lock.son.weight 属性不具备 get 和 set 属性。
2. 注意 weight 是新增属性，所以没有被 vue 察觉。
3. 之后 this.person=obj.child.son，vue 发现是该地址空间已设置过 get/set，于是不再重复设置，导致 this.person.weight 属性不具备 get 和 set 属性。


#### [Vue 响应式原理](https://www.zhihu.com/search?type=content&q=Vue%20%E5%8E%9F%E7%90%86%20%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86)
1. Vue 是怎么知道内存数据改变了？
> 凡是具有 set 方法的数据属性，其变化都会被 Vue 发现
2. Vue 怎么将内存数据与视图数据挂钩？
> data 中的声明的每个属性，都拥有一个数组（依赖收集器 subs），保存着 谁依赖（使用）了它。当页面使用到某个属性时，页面的 watcher 就会被放到对应属性的依赖收集器 subs 中。该过程称为依赖收集。
3. Vue 在内存数据变化后，如何通知视图数据更新？
> 比如当 name 改变（触发 set,被Vue 发现）的时候，name 会遍历自己的依赖收集器 subs，逐个通知 watcher，让 watcher 完成更新。该过程称为依赖更新。


#### sku
> sku 的数据不来自 rap2，而是直接用mock