<template>
    <div id="app">
        <Skeleton v-if="viewLoading"/>
        <transition class="page-wrap" tag="div" :name="transitionName" v-show="!viewLoading">
            <router-view/>
        </transition>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component, Watch} from "vue-property-decorator";
    import {mapGetters, mapState} from "vuex";
    import Skeleton from '@/components/Skeleton.vue'

    @Component({
        components: {Skeleton},
        computed: {...mapState(['viewLoading'])},
    })
    export default class App extends Vue {
        transitionName = 'page-left'

        created() {
        }

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
    }
</script>

<style lang="scss">
    /* 首页内容切换过渡、底部路由导航切换过渡 */
    .page-left-enter-active, .page-left-leave-active {
        transition: all .5s;
    }
    .page-left-enter {
        transform: translateX(100%);
    }
    .page-left-enter-to, .page-left-leave {
        transform: translateX(0);
    }
    .page-left-leave-to {
        transform: translateX(-100%);
    }
    .page-right-enter-active, .page-right-leave-active {
        transition: all .5s;
    }
    .page-right-enter {
        transform: translateX(-100%);
    }
    .page-right-enter-to, .page-right-leave {
        transform: translateX(0);
    }
    .page-right-leave-to {
        transform: translateX(100%);
    }
</style>
