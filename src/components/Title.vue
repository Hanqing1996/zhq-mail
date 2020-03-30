<template>
    <header class="app-header-wrapper app-shell-header">
        <template v-if="!loading">
            <div class="app-header-left">
                <a class="app-header-item">
                    <i class="iconfont icon-back" @click="back"></i>
                </a>
            </div>
            <div class="app-header-middle">
                <div class="app-header-title">{{title}}</div>
            </div>
            <div class="app-header-right">
                <a class="app-header-item">
                    <i class="iconfont icon-search" v-if="showSearchIcon"></i>
                </a>
            </div>
        </template>
    </header>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop} from "vue-property-decorator";

    @Component
    export default class CategoryGroup extends Vue {
        @Prop({default:''}) readonly title!: string
        @Prop({default:true}) readonly showSearchIcon?: boolean
        @Prop({default:false}) readonly loading?: boolean

        created(){
        }

        back(){
            this.$router.back()
        }
    }
</script>

<style scoped>
    .app-shell-header {
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        right: 0;
    }
    .app-header-title {
        width: 100%;
        font-size: 18px;
    }
    .iconfont {
        font-size: 24px;
    }

    .app-header-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        background: #f2f2f2;
        color: #666;
        padding: 0;
    }
    .app-header-wrapper>div {
        display: flex;
        align-items: center;
    }
    .app-header-item {
        display: block;
        width: 32px;
        margin: 0 10px;
    }
    .app-header-middle {
        text-align: center;
        flex: 1;
    }
</style>