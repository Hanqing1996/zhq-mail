<template>
    <div class="app-shell">
        <div class="app-view-wrapper">
            <div class="app-view app-view-with-footer">
                <header class="header">
                    <div class="app-header-wrapper">
                        <div class="app-header-left">
                            <div class="app-header-item logo">
                                <img src="../assets/images/searchlogo.png" alt="">
                            </div>
                        </div>
                        <div class="app-header-middle">
                            <div class="app-header-title">
                                <i class="iconfont icon-search"></i>&nbsp;&nbsp;
                                搜索商品名称
                            </div>
                        </div>
                        <div class="app-header-right">
                            <div class="app-header-item">
                                <i class="iconfont icon-people"></i>
                            </div>
                        </div>
                    </div>
                    <div class="nav">
                        <div class="nav-item" v-for="nav in navList" :key="nav.name">
                            <span style="color: rgb(237, 91, 0); border-color: rgb(242, 242, 242);">{{nav.name}}</span>
                        </div>
                    </div>











                </header>
                <div class="page-wrap">
                    <div class="bodys">
                        bodys
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop} from "vue-property-decorator";
    import LoginInputs from "@/components/LoginForm.vue";

    @Component({components: {LoginInputs}})
    export default class MailLogin extends Vue {
        navList = []

        getNavList() {
            this.$fetch('navList', {}).then(res => {
                this.setNavList(res)
            })
        }

        created() {
            this.getNavList()
        }

        setNavList(res: any) {
            this.navList=res.data.list
        }
    }

</script>


<style scoped lang="scss">
    .header {
        position: fixed;
        top: -1px;
        left: 0;
        right: 0;
        z-index: 99;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2);
        background: #f2f2f2;
    }
    .app-header-item img {
        width: 100%;
    }
    .app-header-title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border: 1px solid #e5e5e5;
        text-align: left;
        color: rgba(0, 0, 0, .3);
        background-color: #fff;
        border-radius: 4px;
        height: 32px;
        padding-left: 12px;
    }
    .icon-people {
        font-size: 24px;
    }
    .nav {
        overflow-x: auto;
        background: #f2f2f2;
        font-size: 14px;
        white-space: nowrap;
        z-index: 2;
    }
    .nav .nav-item {
        display: inline-block;
        padding: 0 14px;
    }
    .nav .nav-item span {
        display: inline-block;
        line-height: 32px;
        border-bottom: 2px solid rgba(237, 91, 0, 0);
    }
    .page-wrap {
        position: relative;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .bodys {
        margin-top: -100px;
        position: absolute;
        top: 82px;
        left: 0;
        right: 0;
        background: rgba(237, 91, 0, 0.1);
        height: 800px;
        line-height: 800px;
        font-size: 72px;
    }
    .app-header-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .app-header-middle {
        flex-grow: 1;
    }
    .app-header-item {
        margin: 0 10px;
    }
    .logo {
        img {
            width: 1.5em;
            height: 1em;
        }
    }
</style>