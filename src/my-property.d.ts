import Vue from 'vue'
import nProgress from "nprogress";

declare module 'vue/types/vue' {
// 声明为 Vue 补充的东西

    interface Vue {
        $fetch: Fetch,
        $NProgress:nProgress.NProgress
    }
}