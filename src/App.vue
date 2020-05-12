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
    import {mapGetters, mapMutations, mapState} from "vuex";
    import Skeleton from '@/components/Skeleton.vue'
    import store from "@/store";

    @Component({
        components: {Skeleton},

        computed: {...mapState(['viewLoading','transitionName'])},
        methods: {...mapMutations(['setTransitionName'])},

    })
    export default class App extends Vue {

        setTransitionName!:(name:string)=>void

        @Watch('$route')
        onRouteChanged(to: any, from: any) {
            if (!from.name) {
                this.setTransitionName('')
            }
            if (to.meta.index && from.meta.index) {
                this.setTransitionName(to.meta.index < from.meta.index ? 'page-right' : 'page-left')
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
    .page-right-enter-active, .page-right-leave-active {
        transition: all .5s;
    }
    .page-right-enter {
        transform: translateX(-100%);
    }
</style>
