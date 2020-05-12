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
                        <div class="border-top-1px ui-flex align-start justify-start J_linksign-customize">
                            <div class="title">送至</div>
                            <div class="flex">
                                <div class="info">
                                    <span class="mr1x">珠海市 香洲区</span>
                                    <span class="on">有现货</span>
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


                    <MiRecommand/>


                </div>
                <div class="ui-mask" v-show="showMask"></div>
                <transition name="sku">
                    <div class="pop" v-show="showSKU">
                        <div class="close" @click="showSKU=false,showMask=false">
                            <i class="iconfont icon-close" ></i>
                        </div>
                        <div class="pro-info layout row align-center justify-space-around">
                            <div class="product-img">
                                <img :src="selectedGood&&selectedGood.img_url">
                            </div>
                            <div class="product-desc flex layout column justify-start">
                                <div class="cur-price">
                                    <div class="price">{{selectedGood&&selectedGood.price}}</div>
                                </div>
                                <div class="name">{{selectedGood&&selectedGood.name}}</div>
                            </div>
                        </div>


                        <div class="max5">
                            <div
                                    v-for="option in buyOption"
                                    :key="option.prop_cfg_id"
                                    :class="{'sdk_color':!option.hasPrice}"
                                    class="border-top-1px mt2x">
                                <div class="option-title pt32">
                                    {{option.name}}
                                    <span style="display: none;">请选择： {{option.name}}</span>
                                </div>
                                <div class="options-group align-center justify-start layout wrap">
                                    <div
                                            v-for="(item,index) in option.list"
                                            :key="item.prop_value_id"
                                            :class="{'on':item.isOn,'line':option.hasPrice,'justify-space-between':option.hasPrice}"
                                            @click="chooseItem(option,index)"
                                            class="option-item border-1px align-center justify-center ui-flex">
                                        <p>{{item.name}}</p>
                                        <p v-show="option.hasPrice">{{item.price}}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="border-top-1px pd32 layout align-center justify-space-between">
                                <div class="option-title">购买数量</div>
                                <div class="xm-input-number">
                                    <div class="input-sub">
                                        <i class="iconfont icon-move"></i>
                                    </div>
                                    <div class="input-num">
                                        <span>1</span>
                                    </div>
                                    <div class="input-add active">
                                        <i class="iconfont icon-add"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="ywb">
                                <div class="border-top-1px pd32">
                                    <div class="option-title">
                                        保障服务
                                        <a href="https://cdn.cnbj0.fds.api.mi-img.com/b2c-data-mishop/4a15d767c1fe.html"
                                           class="service-url">
                                            <!-- <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjhFNUZBNEJBNjg2MTFFN0JGODNEMTFGMzE1NTJDREYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjhFNUZBNENBNjg2MTFFN0JGODNEMTFGMzE1NTJDREYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGNEE0ODY5NEE2NzUxMUU3QkY4M0QxMUYzMTU1MkNERiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyOEU1RkE0QUE2ODYxMUU3QkY4M0QxMUYzMTU1MkNERiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqoKySAAAALWSURBVHjatJfPS1RRFMef9002Q9BiRlPIzE2TusgWQZQFFS364aJwUZBEYW3atAv6S1y0K3chSEUbqQaSQoqKirJGwppxMaZvIaSTaPo98L1xebxf900d+KDMu/d+7zn33PPOa3KSmQuKYA/YBQogy2d1sAgqoAy+gvW4BZtinufAEXAIzINpMAsWwIoxpgV0gW7QBl6ASWOMlfB+MEAPnoGfCaMjmzjBCD0C7xLOcxQ4D24xrGlN5t7mWirOYxkwBJrBPfDbacy2gcvgFxgFf8KEz4F2cCckQeQ8DzLJJMHyoAo8JtZUSGIOM0fGzR+19YHDFA3ytAPcBL0UzfH37UyoXibYZ7BmzNsAH8EZel4zhWWRq+AuM9Zv4tkNjpNMnQAl8IZCeW6gwCiWffPXed0ugFeyMS18nLt5GXJWQ/RKbAS8Z3g9eiAh7qF4F6/Smm+NJa6xA3xT9Fru6ZMQ0TzP1KFANWTclO9YguwptVzF+zbP6uNELOqFJI82z7fZIFukVjFD4emYBccSXJ2dxv9zEeNEa6/ihO8N3tcO5onDxKpGjP0hmuJxq0U5DLJ9YJAZX2WhiDIJdUuGb5l6StFBFhTt6WjUi4Emz7OZBjw9Zog+5r1ObIreZi1Fc8aZ2orK3LpipWpNkUy6ZJYs54rWgmJC7E4Z7nKKOaI15zLcB8Bri8mSIDOs00uWwqekxit2GG0s8DbCcfc1yAqs1V9cvraaWeQ/WZyx3qxnITzASM3olmSSjVrSVuc0uE5sWqFuav3thSR0D8Altiv/2raCi+ChLjBmB1Jjh9gP3vIIwmwL29wy/8b15FfYCJSSNHvSjaz+r2bP9Q0ULz+ATvZIlRTXxTzTa3zz3TdFg4S1uLwzl9kjtfMYli0a+rPgpFFON9J8whxlu1JjwZhlJ2F+whTYa/Xwmknv9jztJ0zQR1uRIcwbtXqFd7nCYpToo21TgAEAWy6shL93DD4AAAAASUVORK5CYII="> -->
                                            <i class="iconfont icon-question"></i>
                                        </a>
                                        <span>手机意外摔落/进水/碾压等损坏</span>
                                    </div>
                                    <div class="options-group">
                                        <div class="ui-flex align-center justify-start">
                                            <div class="option-item border-1px w49">
                                                <p>意外保障服务 179元</p>
                                            </div>
                                        </div>
                                        <div class="options-agree">
                                            <div class="choose">
                                                <i class="iconfont icon-round"></i>
                                            </div>
                                            <span>我已阅读</span>
                                            <a href="https://order.mi.com/static/jrUrl?url=https%3A%2F%2Fapi.jr.mi.com%2Finsurance%2Fdocument%2Fphone_accidentIns.html%3Ffrom%3Dins_phonedetail_bxtk%26insuranceSku%3D19411%26couponFrom%3Drule"
                                               class="org">服务条款 | </a>
                                            <a href="https://order.mi.com/static/jrUrl?url=https%3A%2F%2Fapi.jr.mi.com%2Finsurance%2Fdocument%2Fphone_accidentIns.html%3Ffrom%3Dins_phonedetail_cjwt%26insuranceSku%3D19411%26couponFrom%3Dquestion"
                                               class="org">常见问题</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="btn-bottom">
                            <div class="action-box flex" >
                                <a data-log_code="" class="btn buy-btn" >加入购物车</a>
                            </div>
                        </div>
                    </div>
                </transition>

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

        <!-- 地址选择 -->
        <!-- <div class="h1">
          <p>收货地址</p>
        </div>
        <div class="max5">
          <div class="border-bottom-1px address-item">
            <div class="address-item-line1 layout align-center justify-start">
              <i class="image-icons icon-location"></i>
              <div class="address-item-name">tony</div>
              <div class="address-item-province">北京</div>
            </div>
            <div class="address-item-line2">北京小胡同</div>
          </div>
        </div>
        <div class="btn-bottom">
          <div class="action-box flex">
            <a href="/address/position?from=product&amp;product_id=8274" class="btn buy-btn">选择新地址</a>
          </div>
        </div> -->


    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Prop, Watch} from "vue-property-decorator";
    import Swiper from 'swiper'
    import 'swiper/css/swiper.css'
    import fetch from '@/api/fetch'

    import Component from 'vue-class-component'
    import MiRecommand from "@/components/MiRecommend.vue"

    import Comment from "@/components/Comment.vue";
    import DOMPurify from "dompurify";

    import {default_goods_id, buy_option,goods_info} from "@/mock/sku.js"

    Component.registerHooks([
        'beforeRouteEnter',
        'beforeRouteUpdate',
        'beforeRouteLeave'
    ])

    @Component({components: {Comment, MiRecommand}})
    export default class MailDetail extends Vue {
        productData = null
        galleryView = null
        detailSwiper?: Swiper = undefined
        titleView = null
        canJoinActs = null
        commentView = null
        descTabsView = null
        descTabsViewIndex = 0
        showMask=false
        showSKU=false
        buyOption=null
        goodsInfo=null
        selectedSKU=[]
        selectedGood=null

        destroyed() {
            this.detailSwiper && this.detailSwiper.removeAllSlides()
            this.$NProgress.remove()
        }

        chooseItem(option:object,index:number){
            option.list.forEach((item:any,i:number)=>{
                item.isOn=i==index
            })

            let curSKUIndex=this.selectedSKU.findIndex((item:any)=>{
                return item.prop_cfg_id==option.prop_cfg_id
            })
            this.selectedSKU[curSKUIndex].prop_value_id=option.list[index].prop_value_id

            this.selectedGood=this.goodsInfo.find((item:any)=>{
                return JSON.stringify(item.prop_list)===JSON.stringify(this.selectedSKU)
            })
        }

        addToCart(){
            this.showMask=true
            this.showSKU=true
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

            this.goodsInfo=goods_info
            this.selectedGood=this.goodsInfo.find((item:any)=>{
                return item.goods_id==default_goods_id
            })

            let buyOption=buy_option
            buy_option.forEach((item:any)=>{
                item.list.forEach((list:any)=>{
                    list.isOn=false
                })
                item.hasPrice=!!item.list[0].price
            })

            this.selectedGood&&this.selectedGood.prop_list.forEach((item:any)=>{
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

                let curOption=buyOption.find((option:any)=>{
                    return option.prop_cfg_id==item.prop_cfg_id
                })
                let curIndex=curOption.list.findIndex((list:any)=>{
                    return list.prop_value_id==item.prop_value_id
                })
                curOption.list[curIndex].isOn=true
            })

            this.selectedSKU=JSON.parse(JSON.stringify(this.selectedGood.prop_list))

            this.buyOption=buyOption

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

    .pop {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        /* width: 375px; */
        background-color: #fff;
        color: #000;
        padding: 16px 16px 66px;
        z-index: 110;
        min-height: 250px;
        max-height: 480px;
        text-align: left;
    }

    .pop .close {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 26px;
        height: 26px;
    }

    .pop .close .icon-close {
        /* width: 20px;
        height: 20px;
        background-image: url(../assets/images/icon-close.png); */
        font-size: 20px;
        line-height: 20px;
        color: #bababa;
    }

    /* .image-icons {
      display: inline-block;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: cover;
    } */
    .pop .pro-info {
        min-height: 75px;
    }

    .pop .pro-info .product-img {
        position: relative;
        width: 104px;
        height: 104px;
        text-align: center;
        background: #fff;
    }

    .pop .pro-info .product-img img {
        height: 100%;
        width: auto;
        margin: 0 auto;
    }

    .layout.column {
        flex-direction: column;
    }

    .pop .pro-info .product-desc {
        position: relative;
        width: 225px;
        margin: 16px 8px;
        text-align: left;
    }

    .pop .pro-info .product-desc .price {
        display: inline;
        color: #ff6700;
        font-size: 24px;
        line-height: 19px;
    }

    .pop .pro-info .product-desc .name {
        font-size: 14px;
        color: rgba(0, 0, 0, .87);
        line-height: 20px;
    }

    .pop .option-title {
        position: relative;
        padding-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgba(0, 0, 0, .87);
    }

    .pop .option-title span {
        color: rgba(0, 0, 0, .54);
        margin-left: .5em;
        vertical-align: middle;
    }

    .max5 {
        max-height: 300px;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .pt32 {
        padding-top: 16px;
    }

    .pop .options-group {
        padding-bottom: 16px;
    }

    .pop .option-item.line {
        width: 100%;
        padding: 12px 16px !important;
    }

    .pop .option-item.on {
        color: #f56600;
    }

    .pop .option-item {
        height: 36px;
        line-height: 36px;
        min-width: 72px;
        box-sizing: border-box;
        padding: 0 4px;
        text-align: center;
        margin: 8px 0 0 8px;
        overflow: visible;
        font-size: 12px;
    }

    .pop .option-item:before {
        content: '';
        border-color: rgba(0, 0, 0, .15);
        border-radius: 2px;
    }

    .pop .option-item.on:before {
        border-color: #f56600;
    }

    .sdk_color .option-item p {
        width: 100%;
    }

    .pop .pd32 {
        padding: 16px 0;
    }

    .pop .xm-input-number {
        display: inline-block;
        border: 1px solid #eee;
    }

    /* .pop .xm-input-number .icon-line {
      background-image: url(../assets/images/icon-line.png);
    } */
    /* .pop .xm-input-number .icon-cross {
      background-image: url(../assets/images/icon-cross.png);
    } */
    /* .pop .xm-input-number .image-icons {
      opacity: .3;
      width: 30px;
      height: 30px;
      background-size: 15px 15px;
    } */
    .icon-move, .icon-add {
        font-size: 20px;
        line-height: 30px;
        font-weight: 700;
        color: #857c7c;
    }

    .icon-move {
        color: #bababa;
    }

    .pop .xm-input-number .input-num {
        display: inline-block;
        vertical-align: middle;
        min-width: 30px;
        padding: 0 6px;
        text-align: center;
        font-size: 16px;
    }

    .pop .xm-input-number .input-add, .pop .xm-input-number .input-sub {
        display: inline-block;
        width: 30px;
        height: 30px;
        position: relative;
        vertical-align: middle;
        background-color: #fafafa;
        text-align: center;
    }

    .pop .xm-input-number .input-add.active, .pop .xm-input-number .input-sub.active {
        background-color: #ddd;
    }

    .pop .service-url {
        display: inline-block;
        width: 14px;
        height: 14px;
        /* margin-left: 5px; */
        vertical-align: middle;
    }

    /* .pop .service-url img {
      width: 100%;
      height: auto;
    } */
    .pop .service-url i {
        font-size: 16px;
        left: 14px;
        color: #999;
    }

    .pop .options-group {
        padding-bottom: 16px;
    }

    .w49 {
        width: 49%;
    }

    .pop .options-agree {
        margin-top: 8px;
        line-height: 20px;
        text-align: left;
        font-size: 12px;
    }

    .pop .choose {
        display: inline-block;
        /* width: 30px; */
        padding: 0 4px 0 8px;
        height: 20px;
        position: relative;
        top: 3px;
    }

    .pop .choose i {
        font-size: 24px;
        line-height: 20px;
        color: #ddd;
    }

    /* .pop .choose.unchecked {
      background: url(../assets/images/check_normal.png) 50% 50% no-repeat;
      background-size: 20px 20px;
    } */
    .pop .options-agree .org {
        color: #f56600;
    }

    .pop .btn-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
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


    .sku-enter-active, .sku-leave-active{
        transition: transform .5s;
    }

    .sku-enter,.sku-leave-to{
        transform: translateY(100%);
    }

</style>
