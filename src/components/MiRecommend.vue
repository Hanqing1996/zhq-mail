<template>
    <div class="recommend-box space-top">
        <div class="recommend-top-img">
            <img src="//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/e95ade2750a7fde92369b416c7d3176d.jpg" lazy="loaded">
        </div>
        <div class="recommend-list layout row wrap align-center align-content-start justify-space-between">
            <div class="goods-item" v-for="product in productList">
                <a class="exposure">
                    <div class="goods-img-box">
                        <img class="lazy" :src="product.image_url" lazy="loaded">
                    </div>
                    <div class="goods-info">
                        <div class="goods-name no-wrap">{{product.name}}</div>
                        <div class="goods-price price">
                            {{product.price}}
                            <del class="price">{{product.market_price}}</del>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Prop, Watch} from "vue-property-decorator";

    import Component from 'vue-class-component'

    Component.registerHooks([
        'beforeRouteEnter',
        'beforeRouteUpdate',
        'beforeRouteLeave'
    ])

    @Component({components: {}})
    export default class MiRecommend extends Vue {

        productList=[];

        created(){
            this.getList()
        }

        getList() {
            this.$fetch('forRecommend', {}).then(res => {
                this.setList(res)
            })
        }

        setList(res: any) {
            this.productList = res.data.recom_list
            this.$store.commit('setViewLoading', false)
            this.$NProgress.done()
        }

    }
</script>
<style scoped>
    .recommend-box {
        background: #fff;
        text-align: left;
    }
    .recommend-box .recommend-top-img {
        width: 375px;
    }
    .recommend-box .recommend-top-img img {
        width: 375px;
        height: 62.5px;
    }
    .recommend-box .recommend-list {
        overflow: hidden;
    }
    .recommend-box .recommend-list .goods-item {
        flex: 0 1 49.5%;
        overflow: hidden;
    }
    .recommend-box .recommend-list .goods-item a {
        display: block;
    }
    .recommend-box .recommend-list .goods-img-box {
        position: relative;
    }
    .recommend-box .recommend-list .goods-img-box img {
        display: block;
        width: 100%;
        min-height: 186px;
    }
    .recommend-box .recommend-list .goods-info {
        padding: 9px 13px 11px;
    }
    .recommend-box .recommend-list .goods-name {
        font-size: 14px;
    }
    .recommend-box .recommend-list .goods-price {
        font-size: 14px;
        display: inline-block;
        color: #ff6700;
        margin-top: 5px;
    }
    /* .price:before {
      content: "\A5" !important;
      position: absolute;
      left: 0;
      top: 0;
      font-size: 14px;
      text-decoration: none;
    } */
    .recommend-box .recommend-list .goods-price del {
        font-size: 12px;
        margin-left: 5px;
        color: rgba(0,0,0,.54);
        text-decoration: line-through;
    }
    /* del.price:before {
      font-size: 12px;
    } */
</style>