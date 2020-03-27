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

#### ???
```
this.$route.query.redirect
```