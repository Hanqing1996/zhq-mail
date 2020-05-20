<template>
    <div class="app-shell">
        <div class="app-view-wrapper">
            <div class="app-view">
                <div class="container fluid">
                    <header>
                        <div class="fill-height layout align-center">
                            <a class="header-btn">
                                <i class="iconfont icon-back"></i>
                            </a>
                            <div class="placeholder"></div>
                            <a class="header-btn share-btn">
                                <i class="iconfont icon-share"></i>
                            </a>
                        </div>
                    </header>


                    <div class="swiper-container gallery-view swiper-container-horizontal">
                        <div class="swiper-wrapper">

                            <div class="swiper-slide"
                                 v-for="(imgUrl,index) in galleryView"
                                 :key="index">
                                <img :data-src="imgUrl" alt="" class="img swiper-lazy">
                                <div class="swiper-lazy-preloader"></div>

                            </div>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>


                    <div class="overview">
                        <div class="goods-name ui-flex align-center justify-start">{{titleView&&titleView.name}}</div>
                        <div class="goods-brief" v-html="titleView&&titleView.product_desc">
                        </div>
                        <div class="goods-price layout align-end justify-start">
                            <div class="price cur-price">{{titleView&&titleView.price}}</div>
                            <div class="price origin-price">{{titleView&&titleView.market_price}}</div>
                        </div>
                    </div>


                    <div class="product-section more">
                        <div class="border-top-1px ui-flex align-start justify-start J_linksign-customize">
                            <div class="title">促销</div>
                            <div class="flex pt1-2x">
                                <div class="ui-flex align-center justify-start act-icon mb2x">
                                    <div class="icon-desc border-1px">{{canJoinActs&&canJoinActs.type_desc}}</div>
                                    <div class="icon-title">{{canJoinActs&&canJoinActs.title}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-section more mt2x padding-16-32">
                        <div class="ui-flex align-start justify-start J_linksign-customize">
                            <div class="title">已选</div>
                            <div class="flex">
                                <div class="info">{{selectedGood&&selectedGood.name}} x1</div>
                            </div>
                        </div>
                    </div>
                    <div class="product-section more padding-16-32">
                        <div
                                @click="showAddressPop=true"
                                class="border-top-1px ui-flex align-start justify-start J_linksign-customize">
                            <div class="title">送至</div>
                            <div class="flex">
                                <div class="info">
                                    <span class="mr1x">{{deliveryData&&deliveryData.address_info&&deliveryData.address_info.address}}</span>
                                    <span class="on">{{deliveryData&&deliveryData.datas.length?'有现货':''}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-section padding-16-32">
                        <div class="border-top-1px ui-flex align-center justify-start J_linksign-customize service-policy-list">
                            <div class="flex service-policy-item">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAChklEQVR4Ab3YA6zkUBgF4Lu2bdu2bdu2bdu2Ea1t27ZtW7OnyZnkz9s2r+3emSRfJlf/PaNKfW6pnAgB5aAHbIAH4KFnsAv6QxWI5KS23YkpYDp8AI8DSyGnjiBRYR54hF0wCApCKogHcRg2L3SF9SaBkrgNUhLeiGKjuZmyKR70gc+iRn2nQeqLxdsgESiXIsJKUa+f3SAyRH9QmjQXdbsFFqSgmNwGlGYVrL4mOSkMfOWkvqB8pIEIk9gsyAoO7gDlY0u415GAQRJw4DdE9EOQUPCWe+aAfxIOBaVZGCgNwUAJTbjnfmA6dFAEzSGCwQXWLgdKEkfqeEajog9/G6dY+wokNBlfwPEWRmM4Gx01h9jPulchlMWcapyz3GgcZSOrpgDB4agIER6UhSScd9do/GQjvqYQp+2EoMic+0WJH2oMk4lZ4Q6MdhjifGAhKIj3pCiDxDGZWEiMdwVlRXwd1yEkKJteeIN8ZAGr64W6Ikwni4PTEREivMMrvt/eIIdZJBsoC+VFmM4BQpx3E4LicO1r+fftAMpBmMhwju0rTkNQEa7fLv/Lm2wsrC7CvObrJQgByoXRrNHDaERk46etHxnPERZ/Uafus05Gb8d6+WO0oQYs/s8QxbjnLXn2TcvOjxAElB/c4J6VZRDDFg4s90OIkdzrttkVWmzwUF0fhsgj9skjg1hdTxYDpVla+MH6YwK7nRgmwtTUGKIgfGfdWXZvsPqJMBPEccKt4aLeTKe3nB3E4gfQ2MU/qhpcFHWGub0JzwH7RaHnMA3KQVIIC4pCQ2IoAZPgjlh3GorqeCxRHnaKwtILeGoxdhJqa3s+IqSD9rAa7oh/gNdj2AZd5dncjr+ClBUwCf4HjgAAAABJRU5ErkJggg=="
                                     class="mr1x img-icon">
                                <span class="fsc1">7天无理由退货</span>
                            </div>
                            <div class="flex service-policy-item">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAChklEQVR4Ab3YA6zkUBgF4Lu2bdu2bdu2bdu2Ea1t27ZtW7OnyZnkz9s2r+3emSRfJlf/PaNKfW6pnAgB5aAHbIAH4KFnsAv6QxWI5KS23YkpYDp8AI8DSyGnjiBRYR54hF0wCApCKogHcRg2L3SF9SaBkrgNUhLeiGKjuZmyKR70gc+iRn2nQeqLxdsgESiXIsJKUa+f3SAyRH9QmjQXdbsFFqSgmNwGlGYVrL4mOSkMfOWkvqB8pIEIk9gsyAoO7gDlY0u415GAQRJw4DdE9EOQUPCWe+aAfxIOBaVZGCgNwUAJTbjnfmA6dFAEzSGCwQXWLgdKEkfqeEajog9/G6dY+wokNBlfwPEWRmM4Gx01h9jPulchlMWcapyz3GgcZSOrpgDB4agIER6UhSScd9do/GQjvqYQp+2EoMic+0WJH2oMk4lZ4Q6MdhjifGAhKIj3pCiDxDGZWEiMdwVlRXwd1yEkKJteeIN8ZAGr64W6Ikwni4PTEREivMMrvt/eIIdZJBsoC+VFmM4BQpx3E4LicO1r+fftAMpBmMhwju0rTkNQEa7fLv/Lm2wsrC7CvObrJQgByoXRrNHDaERk46etHxnPERZ/Uafus05Gb8d6+WO0oQYs/s8QxbjnLXn2TcvOjxAElB/c4J6VZRDDFg4s90OIkdzrttkVWmzwUF0fhsgj9skjg1hdTxYDpVla+MH6YwK7nRgmwtTUGKIgfGfdWXZvsPqJMBPEccKt4aLeTKe3nB3E4gfQ2MU/qhpcFHWGub0JzwH7RaHnMA3KQVIIC4pCQ2IoAZPgjlh3GorqeCxRHnaKwtILeGoxdhJqa3s+IqSD9rAa7oh/gNdj2AZd5dncjr+ClBUwCf4HjgAAAABJRU5ErkJggg=="
                                     class="mr1x img-icon">
                                <span class="fsc1">15天质量问题换货</span>
                            </div>
                            <div class="flex service-policy-item">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAChklEQVR4Ab3YA6zkUBgF4Lu2bdu2bdu2bdu2Ea1t27ZtW7OnyZnkz9s2r+3emSRfJlf/PaNKfW6pnAgB5aAHbIAH4KFnsAv6QxWI5KS23YkpYDp8AI8DSyGnjiBRYR54hF0wCApCKogHcRg2L3SF9SaBkrgNUhLeiGKjuZmyKR70gc+iRn2nQeqLxdsgESiXIsJKUa+f3SAyRH9QmjQXdbsFFqSgmNwGlGYVrL4mOSkMfOWkvqB8pIEIk9gsyAoO7gDlY0u415GAQRJw4DdE9EOQUPCWe+aAfxIOBaVZGCgNwUAJTbjnfmA6dFAEzSGCwQXWLgdKEkfqeEajog9/G6dY+wokNBlfwPEWRmM4Gx01h9jPulchlMWcapyz3GgcZSOrpgDB4agIER6UhSScd9do/GQjvqYQp+2EoMic+0WJH2oMk4lZ4Q6MdhjifGAhKIj3pCiDxDGZWEiMdwVlRXwd1yEkKJteeIN8ZAGr64W6Ikwni4PTEREivMMrvt/eIIdZJBsoC+VFmM4BQpx3E4LicO1r+fftAMpBmMhwju0rTkNQEa7fLv/Lm2wsrC7CvObrJQgByoXRrNHDaERk46etHxnPERZ/Uafus05Gb8d6+WO0oQYs/s8QxbjnLXn2TcvOjxAElB/c4J6VZRDDFg4s90OIkdzrttkVWmzwUF0fhsgj9skjg1hdTxYDpVla+MH6YwK7nRgmwtTUGKIgfGfdWXZvsPqJMBPEccKt4aLeTKe3nB3E4gfQ2MU/qhpcFHWGub0JzwH7RaHnMA3KQVIIC4pCQ2IoAZPgjlh3GorqeCxRHnaKwtILeGoxdhJqa3s+IqSD9rAa7oh/gNdj2AZd5dncjr+ClBUwCf4HjgAAAABJRU5ErkJggg=="
                                     class="mr1x img-icon">
                                <span class="fsc1">365天保修</span>
                            </div>
                        </div>
                    </div>

                    <div class="comment-view space-top">
                        <a href="/comment/list/2181500027"
                           class="comment-info border-bottom-1px box-flex align-center justify-space-between entry-more">
                            <div class="comment-count">用户评价({{commentView&&commentView.detail.comments_total}})</div>
                            <div class="comment-degree">
                                {{commentView&&commentView.detail.satisfy_per}}%
                                <span>满意</span>
                            </div>
                        </a>
                        <Comment :comment="commentView&&commentView.list[0]"/>
                    </div>

                    <div class="description-view space-top">
                        <div class="tab-header">
                            <div class="tab-header-inner border-bottom-1px box-flex align-center">
                                <a
                                        v-for="(desc,index) in descTabsView"
                                        :key="index"
                                        :class="{on:index==descTabsViewIndex}"
                                        @click="descTabsViewIndex=index"
                                        class="flex">{{desc.name}}</a>
                            </div>
                        </div>
                        <div class="tab-view">
                            <div
                                    v-for="(desc,index) in descTabsView"
                                    :key="index"
                                    v-show="index==descTabsViewIndex"
                                    class="tab-item">
                                <section>
                                    <div class="desc-img-box">
                                        <img
                                                v-for="(item,index2) in desc.showTabContent"
                                                :key="index2"
                                                :src="item.plainView.img"
                                                lazy="loaded">
                                    </div>
                                </section>
                                <section>
                                    <div class="desc-img-box" v-show="desc.showMore">
                                        <img
                                                v-for="(item,index3) in desc.moreTabContent"
                                                :key="index3"
                                                :src="item.plainView.img"
                                                lazy="loaded">
                                    </div>
                                </section>
                                <a class="show-all-desc" v-show="!desc.showMore" @click="desc.showMore=true">查看全部图文详情
                                    &gt;</a>

                            </div>
                        </div>
                    </div>


                    <MailRecommend/>


                </div>
                <div class="ui-mask" v-show="showMask"></div>
                <MailSKU
                        :showSKU.sync="showSKU"
                        :selectedGood="selectedGood"
                        :buyOption="buyOption"
                        @updateOption="chooseItem"
                />
                <MailPop v-model="showAddressPop">
                    <div class="h1">
                        <p>收货地址</p>
                    </div>
                    <div class="max5">
                        <div
                                v-for="item in addressList"
                                :key="item.address_id"
                                @click="selectAddress(item)"
                                class="border-bottom-1px address-item">
                            <div class="address-item-line1 layout align-center justify-start">
                                <i class="iconfont icon-locationfill"></i>
                                <div class="address-item-name">{{item.consignee}}</div>
                                <div class="address-item-province">{{item.city}}</div>
                            </div>
                            <div class="address-item-line2">{{item.address}}</div>
                        </div>
                    </div>
                    <div class="btn-bottom">
                        <div class="action-box flex">
                            <a href="/address/position?from=product&amp;product_id=8274" class="btn buy-btn">选择新地址</a>
                        </div>
                    </div>
                </MailPop>

                <footer>
                    <div class="fill-height layout align-center">
                        <a class="footer-btn router-link-active">
                            <i class="iconfont icon-home"></i>
                            <span>首页</span>
                        </a>
                        <a class="footer-btn">
                            <i class="iconfont icon-cart"></i>
                            <span>购物车</span>
                        </a>
                        <div class="action-box flex" @click="addToCart">
                            <a class="btn buy-btn">加入购物车</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>


    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Prop, Watch} from "vue-property-decorator";
    import Swiper from 'swiper'
    import 'swiper/css/swiper.css'
    import fetch from '@/api/fetch'

    import Component from 'vue-class-component'
    import MailRecommend from "@/components/MailRecommend.vue"
    import MailSKU from "@/components/MailSKU.vue"
    import MailPop from "@/components/MailPop.vue";

    import Comment from "@/components/Comment.vue";
    import DOMPurify from "dompurify";

    import {default_goods_id, buy_option, goods_info} from "@/mock/sku.js"
    import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

    Component.registerHooks([
        'beforeRouteEnter',
        'beforeRouteUpdate',
        'beforeRouteLeave'
    ])

    @Component({
        components: {Comment, MailRecommend, MailSKU, MailPop},
        computed: {...mapGetters(['isLogin']),...mapState({addressList:state=>state.address.list}),...mapGetters({defaultAddress: 'address/default'})},

        //computed: {...mapGetters(['isLogin'])},
        methods: {...mapActions('address', ['getAddressList'])}
    })
    export default class MailDetail extends Vue {
        productData = null
        galleryView = null
        detailSwiper?: Swiper = undefined
        titleView = null
        canJoinActs = null
        commentView = null
        descTabsView = null
        descTabsViewIndex = 0
        showSKU = false
        buyOption = null
        goodsInfo = null
        selectedSKU = []
        selectedGood = null

        showAddressPop = false
        deliveryData = null

        get showMask() {
            return this.showSKU
        }

        created() {
/*
            if (this.isLogin) {
                // 已登录，直接请求 addressList 接口
                this.getAddressList(() => {
                    // 在不做选择的情况下显示默认地址
                    if (this.defaultAddress) {
                        this.$fetch('estDelivery', {
                            address_id: this.defaultAddress.address_id
                        }).then(res => {
                            this.deliveryData = res.data
                        })
                    }
                })
            }else {
                // 未登录，根据经纬度确定
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        this.$fetch('estDelivery', {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }).then(res => {
                            console.log(res.data);
                            this.deliveryData = res.data
                        })
                    })
                }
            }
            */



            this.getAddressList(() => {
                if (this.defaultAddress) {
                    this.$fetch('estDelivery', {
                        address_id: this.defaultAddress.address_id
                    }).then(res => {
                        this.deliveryData = res.data
                    })
                }
            })



        }

        destroyed() {
            this.detailSwiper && this.detailSwiper.removeAllSlides()
            this.$NProgress.remove()
        }

        // 变更收货地址
        selectAddress(item:any){
            this.$fetch('estDelivery', {
                address_id: item.address_id
            }).then(res => {
                this.deliveryData = res.data
                this.showAddressPop=false
            })
        }

        chooseItem(option: object, index: number) {

            option.list.forEach((item: any, i: number) => {
                item.isOn = i == index
            })

            let curSKUIndex = this.selectedSKU.findIndex((item: any) => {
                return item.prop_cfg_id == option.prop_cfg_id
            })
            this.selectedSKU[curSKUIndex].prop_value_id = option.list[index].prop_value_id

            this.selectedGood = this.goodsInfo.find((item: any) => {
                return JSON.stringify(item.prop_list) === JSON.stringify(this.selectedSKU)
            })
        }

        addToCart() {
            this.showSKU = true
        }

        beforeRouteEnter(to: any, from: any, next: any) {
            if (!from.name) {
                // 刷新
                next((vm: any) => vm.getList())
            } else {
                // 路由切换
                fetch('productView', {
                    commodity_id: to.params.id
                }).then(res => {
                    next((vm: any) => vm.setList(res))
                })
            }
        }

        getList() {
            this.$fetch('productView', {
                commodity_id: this.$route.params.id
            }).then(res => {
                this.setList(res)
            })
        }

        setList(res: any) {

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

            this.descTabsView = descTabsView

            this.productData = res.data
            this.galleryView = res.data.view_content.galleryView.galleryView
            this.titleView = res.data.view_content.titleView.titleView
            this.canJoinActs = res.data.view_content.titleView.titleView.canJoinActs[0]
            this.commentView = res.data.view_content.commentView.commentView

            this.goodsInfo = goods_info
            this.selectedGood = this.goodsInfo.find((item: any) => {
                return item.goods_id == default_goods_id
            })

            let buyOption = buy_option
            buy_option.forEach((item: any) => {
                item.list.forEach((list: any) => {
                    list.isOn = false
                })
                item.hasPrice = !!item.list[0].price
            })

            this.selectedGood && this.selectedGood.prop_list.forEach((item: any) => {
                /*
                // 选中产品信息如下
                {
                    // 版本（185）为4GB+64GB（618）
                    "prop_cfg_id": 185,
                    "prop_value_id": 618
                },
                {
                    // 颜色（186）为曜石黑（623）
                    "prop_cfg_id": 186,
                    "prop_value_id": 623
                }
                */

                let curOption = buyOption.find((option: any) => {
                    return option.prop_cfg_id == item.prop_cfg_id
                })
                let curIndex = curOption.list.findIndex((list: any) => {
                    return list.prop_value_id == item.prop_value_id
                })
                curOption.list[curIndex].isOn = true
            })

            this.selectedSKU = JSON.parse(JSON.stringify(this.selectedGood.prop_list))

            this.buyOption = buyOption

            //console.log(this.selectedGood);


            this.$store.commit('setViewLoading', false)
            this.$NProgress.done()

            this.$nextTick(() => {
                this.detailSwiper = new Swiper('.swiper-container', {
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                    },
                    // Disable preloading of all images
                    preloadImages: false,
                    // Enable lazy loading
                    lazy: true
                })
            })


        }


    }
</script>

<style scoped>
    .app-view {
        padding-bottom: 52px;
    }

    .container {
        position: relative;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        /* padding-bottom: 52px; */
        background: #efefef;
        margin-right: auto;
        margin-left: auto;
        -webkit-flex-basis: 100%;
        flex-basis: 100%;
    }

    .container.fluid {
        max-width: 100%;
        width: 100%;
    }

    header {
        height: 50px;
        background: transparent;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
    }

    .fill-height {
        height: 100%;
    }

    .layout {
        display: flex;
        flex-wrap: nowrap;
    }

    header .header-btn {
        display: block;
        width: 32px;
        height: 32px;
        margin: 0 10px;
        color: #ddd;
        background: rgba(0, 0, 0, .6);
        border-radius: 50%;
    }

    header .iconfont {
        font-size: 20px;
        line-height: 32px;
    }

    header .placeholder {
        flex: 1;
    }

    .container .gallery-view {
        background: #ccc;
        width: 100%;
        height: 412px;
        position: relative;
    }

    .container .gallery-view .img {
        display: block;
        width: 375px;
        height: 412px;
        max-width: 100%;
        max-height: 100%;
        position: absolute;
    }

    .swiper-pagination {
        position: absolute;
        bottom: 10px;
        left: 0;
        width: 100%;
        text-align: center;
        z-index: 10;
    }

    .container .overview {
        background: #fff;
        text-align: left;
        padding: 10px 16px 0;
    }

    .container .overview .goods-name {
        font-size: 18px;
        line-height: 28px;
    }

    .container .overview .goods-brief {
        font-size: 14px;
        line-height: 18px;
        color: rgba(0, 0, 0, .54);
    }

    .container .overview .goods-price {
        padding: 10px 0;
    }

    .container .overview .goods-price .cur-price {
        color: #ff6700;
        font-size: 24px;
        font-weight: 700;
    }

    .container .overview .goods-price .origin-price {
        margin-left: 8px;
        color: rgba(0, 0, 0, .54);
        font-size: 12px;
        text-decoration: line-through;
    }

    .align-end {
        align-items: flex-end;
    }

    .container .product-section {
        position: relative;
        padding: 10px 16px 0;
        background: #fff;
        border-top: 1px;
        text-align: left;
    }

    .border-top-1px {
        position: relative;
    }

    .border-top-1px:before {
        height: 1px;
        content: "";
        width: 100%;
        border-top: 1px solid #999;
        position: absolute;
        border-color: #f4f4f4;
        top: -10px;
        right: 0;
        transform: scaleY(.5);
    }

    .container .product-section .title {
        width: 41px;
        font-size: 12px;
        color: rgba(0, 0, 0, .54);
        line-height: 20px;
    }

    .pt1-2x {
        padding-top: 2px;
    }

    .container .product-section .act-icon {
        position: relative;
        padding-right: 10%;
        white-space: nowrap;
    }

    .mb2x {
        margin-bottom: 4px;
    }

    .container .product-section .act-icon .icon-desc {
        color: #f56600;
        border-radius: 1px;
        padding: 1.5px 2.5px 0.5px;
        margin: 0 0 0.5px;
        font-size: 8px;
    }

    .container .product-section .act-icon .icon-desc:before {
        border-color: #f56600;
    }

    .border-1px {
        position: relative;
    }

    .border-1px:before {
        content: "";
        pointer-events: none;
        box-sizing: border-box;
        position: absolute;
        width: 200%;
        height: 200%;
        left: 0;
        top: 0;
        border-radius: 0;
        border: 1px solid #999;
        transform: scale(.5);
        transform-origin: 0 0;
    }

    .container .product-section .act-icon .icon-title {
        margin-left: 4.17px;
        font-size: 12px;
        line-height: 20px;
        color: rgba(0, 0, 0, .87);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .more:after {
        content: "";
        position: absolute;
        right: 16px;
        top: 50%;
        width: 8px;
        height: 8px;
        border-left: 1px solid currentColor;
        border-top: 1px solid currentColor;
        transform: translate3d(0, -50%, 0) rotate(135deg);
    }

    .container .product-section.padding-16-32 {
        padding: 8px 16px;
    }

    .mt2x {
        margin-top: 4px;
    }

    .container .product-section .info {
        font-size: 12px;
        color: rgba(0, 0, 0, .87);
        line-height: 20px;
        padding-right: 10px;
    }

    .container .product-section .service-policy-item {
        font-size: 12px;
        line-height: 20px;
        margin-right: 10px;
        flex: 0 1 auto;
    }

    .container .product-section .img-icon {
        height: 10px;
        width: auto;
    }

    .mr1x {
        margin-right: 4px;
    }

    .container .product-section .fsc1 {
        font-size: 10px;
        color: rgba(0, 0, 0, .54);
    }

    .container .comment-view {
        text-align: left;
        background: #fff;
    }

    .space-top {
        margin-top: 8px;
    }

    .container .comment-view .comment-info {
        padding: 16px 0;
        margin: 0 16px;
        font-size: 12px;
    }

    .border-bottom-1px {
        position: relative;
    }

    .container .comment-view .border-bottom-1px:before {
        border-color: #f4f4f4;
    }

    .border-bottom-1px:before {
        height: 1px;
        content: "";
        width: 100%;
        border-top: 1px solid #999;
        position: absolute;
        top: 100%;
        right: 0;
        transform: scaleY(.5);
        -webkit-transform: scaleY(.5);
    }

    .container .comment-view .comment-count,
    .container .comment-view .comment-degree span {
        color: rgba(0, 0, 0, .54);
    }

    .container .comment-view .comment-degree {
        color: #ff6700;
        text-align: right;
    }

    .entry-more {
        position: relative;
        padding-right: 20px !important;
    }

    .entry-more:after {
        content: " ";
        width: 7px;
        height: 7px;
        border-top: 1px solid #ddd;
        border-right: 1px solid #ddd;
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -3.5px;
        transform: rotate(45deg);
    }

    .box-flex > *, .box-inline-flex > * {
        flex: 1 1 auto;
    }

    .container .description-view .tab-header {
        height: 44px;
    }

    .container .description-view .tab-header-inner {
        height: 44px;
        background: #fff;
        will-change: scroll-position;
    }

    .container .description-view .tab-header-inner .flex.on {
        color: #ff6700;
    }

    .container .description-view .tab-header-inner .flex {
        display: block;
        font-size: 13px;
        width: 100%;
        border-right: 1px solid #f4f4f4;
    }

    .container .description-view .tab-view {
        background: #fff;
    }

    .container .description-view .tab-view section {
        overflow: hidden;
    }

    .container .description-view .tab-view img {
        display: block;
        width: 100%;
        vertical-align: middle;
    }

    .container .description-view .show-all-desc {
        display: block;
        background: #fff;
        line-height: 44px;
        font-size: 13px;
        color: #ff6700;
    }

    .recommend-box {
        background: #fff;
        text-align: left;
    }

    .recommend-box .recommend-title {
        line-height: 40px;
        padding: 0 16px;
        font-size: 15px;
    }

    .recommend-box .recommend-list {
        overflow: hidden;
    }

    .layout.row {
        flex-direction: row;
    }

    .align-content-start {
        align-content: flex-start;
    }

    .layout.wrap {
        flex-wrap: wrap;
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
        width: 185px;
        height: 185px;
    }

    .recommend-box .recommend-list .goods-info {
        padding: 9px 13px 11px;
    }

    .recommend-box .recommend-list .goods-name {
        font-size: 14px;
    }

    .recommend-box .recommend-list .goods-price {
        font-size: 16px;
        display: inline-block;
        color: #ff6700;
        margin-top: 5px;
    }

    .price {
        position: relative;
        padding-left: 10px;
        line-height: 16px;
    }

    .price:before {
        content: "\A5";
        position: absolute;
        left: 0;
        top: 0;
        font-size: 16px;
        text-decoration: none;
    }

    .recommend-box .recommend-list .goods-price del {
        font-size: 11px;
        margin-left: 5px;
        color: rgba(0, 0, 0, .54);
        text-decoration: line-through;
    }

    footer {
        height: 52px;
        background: #fff;
        box-shadow: 0 3px 14px 2px rgba(0, 0, 0, .12);
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
    }

    footer .footer-btn {
        display: block;
        text-decoration: none;
        width: 72px;
        color: rgba(0, 0, 0, .54);
        border-left: 1px solid #f4f4f4;
        display: flex;
        flex-direction: column;
    }

    footer .footer-btn:first-child {
        border-left: none;
    }

    footer .iconfont {
        font-size: 20px;
    }

    footer .footer-btn span {
        font-size: 11px;
    }

    footer .action-box .buy-btn {
        height: 52px;
        line-height: 52px;
    }

    .btn {
        display: block;
        outline: 0;
        background: #ff6700;
        color: #fff;
        text-align: center;
        width: 100%;
        height: 52px;
        line-height: 52px;
        font-size: 14px;
    }

    .ui-mask {
        background-color: rgba(0, 0, 0, .75);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
    }

    .border-top-1px {
        position: relative;
    }

    .border-top-1px:before {
        height: 1px;
        content: "";
        width: 100%;
        border-top: 1px solid #f4f4f4;
        position: absolute;
        top: -8px;
        right: 0;
        transform: scaleY(.5);
        -webkit-transform: scaleY(.5);
    }


    .sku-enter-active, .sku-leave-active {
        transition: transform .5s;
    }

    .sku-enter, .sku-leave-to {
        transform: translateY(100%);
    }

    /* 地址pop */
    .pop .h1 {
        color: rgba(0, 0, 0, .87);
        font-size: 16px;
        text-align: center;
        padding: 12px 0;
    }

    .max5 {
        max-height: 300px;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .pop .address-item {
        text-align: left;
        padding: 8px 0;
    }

    .pop .address-item-line1 {
        font-size: 16px;
        color: rgba(0, 0, 0, .87);
        line-height: 20px;
    }

    .pop .address-item-line1 .address-item-name {
        margin-right: 5px;
    }

    .pop .address-item-line2 {
        font-size: 14px;
        color: rgba(0, 0, 0, .54);
        padding-left: 22px;
    }

    .pop .btn-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .icon-locationfill {
        font-size: 14px;
        margin-right: 8px;
    }

    .border-bottom-1px:before {
        transform: scaleY(0.2);
    }

    .bubble {
        position: absolute;
        min-width: 14px;
        line-height: 14px;
        height: 14px;
        box-sizing: border-box;
        padding: 0 3px;
        font-size: 10px;
        overflow: hidden;
        text-align: center;
        border-radius: 10px;
        background: #ed4d41;
        color: #fff;
        top: 0;
        /* left: 50%; */
        transform: translate3d(40px, 2px, 0);
        font-style: normal;
    }

</style>
