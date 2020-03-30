<template>
    <footer class="app-bottom-navigator-wrapper app-shell-footer">
        <div class="fill-height box-flex align-center">
            <router-link
                    v-for="nav in navigation"
                    :key="nav.icon"
                    class="flex"
                    active-class="on"
                    :to="{name: nav.link}">
                <i class="iconfont" :class="nav.link==$route.name?nav.iconon:nav.icon"></i>
                <span>{{nav.name}}</span>
<!--                <em v-if="nav.link=='cart'&&count" class="bubble">{{count}}</em>-->
            </router-link>
        </div>
    </footer>
</template>

<script lang="ts">
    import { mapState } from 'vuex'
    const navigation = [
        {
            name: '首页',
            icon: 'icon-home',
            iconon: 'icon-homefill',
            link: 'home'
        },
        {
            name: '分类',
            icon: 'icon-goods',
            iconon: 'icon-goodsfill',
            link: 'category'
        },
        {
            name: '购物车',
            icon: 'icon-cart',
            iconon: 'icon-cartfill',
            link: 'cart'
        },
        {
            name: '我的',
            icon: 'icon-people',
            iconon: 'icon-peoplefill',
            link: 'user'
        }
    ]
    import Vue from 'vue'
    import {Component, Prop} from "vue-property-decorator";

    @Component
    export default class Nav extends Vue {
        navigation=navigation
    }
</script>
<style scoped lang="scss">
    .app-shell-footer {
        position: fixed;
        z-index: 9999;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .app-bottom-navigator-wrapper {
        height: 52px;
        background: #fff;
        box-shadow: 0 3px 14px 2px rgba(0, 0, 0, .12);
    }
    .fill-height {
        height: 100%;
    }
    .align-center {
        align-items: center;
    }
    .box-flex {
        display: flex;
    }
    .flex {
        text-align: center;
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        color: #999;
    }
    .iconfont {
        font-size: 24px;
    }
    .flex span {
        font-size: 12px;
    }
    .on {
        color: #ff6700;
    }
</style>