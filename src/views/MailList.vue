<template>

    <div class="app-shell">
        <Title title="商品列表"/>
        <div class="app-view-wrapper">
            <div class="app-view app-view-with-header app-view-with-footer">
                <ol style="padding-bottom: 10px">

                    <router-link
                            v-for="product in commodityList"
                            :key="product.product_id"
                            class="item ui-flex align-center"
                            tag="li"
                            :to="{name: 'detail', params: {id: product.product_id}}">
                        <a class="item-img exposure">
                            <img :src="product.img_url"  lazy="loaded">
                            <span>
                <img :src="product.icon_img">
              </span>
                        </a>
                        <div class="item-intro box-flex flex">
                            <div class="item-name flex">
                                <p>{{product.name}}</p>
                            </div>
                            <div class="item-brief flex">
                                <p v-html="product.product_desc">
                                </p>
                            </div>
                            <div class="item-intro-price flex">
                                <span class="price" style="padding-left: 1em">&nbsp;{{product.price}}</span>
                            </div>
                        </div>
                    </router-link>
                </ol>
                <MiRecommand/>
            </div>

        </div>

        <Nav/>


    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Prop, Watch} from "vue-property-decorator";
    import fetch from '@/api/fetch'
    import Title from "@/components/Title.vue"
    import MiRecommand from "@/components/MailRecommend.vue"

    import DOMPurify from 'dompurify';

    import Component from 'vue-class-component'

    Component.registerHooks([
        'beforeRouteEnter',
        'beforeRouteUpdate',
        'beforeRouteLeave'
    ])

    @Component({components: {Title,MiRecommand}})
    export default class MailList extends Vue {

        commodityList = []

        beforeRouteEnter(to: any, from: any, next: any) {
            if (!from.name) {
                // 刷新
                next((vm: any) => vm.getList())
            } else {
                // 路由切换
                fetch('commodity', {}).then(res => {
                    next((vm: any) => vm.setList(res))
                })
            }
        }

        getList() {
            this.$fetch('commodity', {
                category_id:this.$route.params.id
            }).then(res => {
                this.setList(res)
            })
        }

        setList(res: any) {
            this.commodityList = res.data.list.map((item:any)=>{return{...item,product_desc:DOMPurify.sanitize(item.product_desc)}})
            this.$store.commit('setViewLoading', false)
            this.$NProgress.done()
        }


    }
</script>
<style scoped>
    .item:not(:last-child) {
        padding: 0 0 3px;
        position: relative;
    }

    .item:not(:last-child):after {
        content: "";
        position: absolute;
        bottom: 1px;
        left: 160px;
        right: 0;
        border-bottom: 1px solid #e4e4e4;
    }

    .item-img {
        position: relative;
        width: 156px;
        height: 156px;
        text-align: center;
        display: block;
    }

    .item-img img {
        width: auto;
        height: 100%;
    }

    .item-img span {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 78px;
    }

    .item-img span img {
        width: auto;
        height: 16px;
    }

    .item-intro {
        display: block;
        padding: 0 16px 4px;
        width: 185px;
        box-sizing: border-box;
        text-align: left;
    }

    .item-intro .item-name {
        font-size: 16px;
        color: rgba(0, 0, 0, .87);
        margin-bottom: 8px;
    }

    .item-intro .item-brief {
        font-size: 12px;
        color: rgba(0, 0, 0, .54);
        margin-bottom: 8px;
        line-height: 16px;
        height: 32px;
        overflow: hidden;
    }

    .item-intro .item-brief p {
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
    }

    .item-intro .item-intro-price {
        font-size: 16px;
        position: relative;
    }

    .item-intro span {
        color: #ff6000;
    }

    .price {
        position: relative;
        padding-left: 8px;
        line-height: 18px;
    }

    .price:before {
        content: "\A5";
        position: absolute;
        left: 0;
        top: 0;
        font-size: 16px;
        text-decoration: none;
    }
</style>