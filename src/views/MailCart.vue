<template>
    <div class="app-shell app-shell-bottom-navigation">
        <Title title="购物车"/>
        <div class="app-view-wrapper">
            <div class="container fluid app-view app-view-with-header">
                <div class="page-wrap">
                    <div class="nologin">
                        <a class="box-flex align-center justify-space-between">
                            <span class="flex">登录后享受更多优惠</span>
                            <em class="flex">去登录</em>
                        </a>
                    </div>
                    <div class="cart-list">
                        <ol>
                            <li
                                    v-for="item in cartList"
                                    :key="item.goodsId"
                                    class="item">
                                <div class="ui-flex align-center justify-center">
                                    <div
                                            @click="cartSelect(item)"
                                            :class="{'checked':item.sel_status==1}"
                                            class="choose flex">
                                        <i class="iconfont"
                                           v-show="item.type=='good'"
                                           :class="item.sel_status==1?'icon-roundcheckfill':'icon-round'"></i>
                                    </div>
                                    <router-link
                                            :to="{name:'detail',params:{id:item.goodsId}}"
                                            href="/commodity/detail/2175200009"
                                            class="imgProduct flex">
                                        <img v-lazy="item.image_url">
                                    </router-link>
                                    <div class="info flex">
                                        <p class="name">
                                            <span class="flex">{{item.product_name}}</span>
                                        </p>
                                        <div class="price-without" v-if="item.price">
                                            <span>售价：</span>
                                            <span>{{item.price}}元</span>
                                            <template v-if="item.parent_goodsId">
                                                <span>合计</span>
                                                <span>{{item.price*item.num}}元</span>
                                            </template>
                                        </div>
                                        <div class="num">
                                            <div class="xm-input-number">
                                                <div class="input-sub" :class="{'active':item.type!='gift'&&item.num>1}"
                                                     @click="cartEdit(item,-1)">
                                                    <i class="iconfont icon-move"></i>
                                                </div>
                                                <div class="input-num">
                                                    <span>{{item.num}}</span>
                                                </div>
                                                <div class="input-add"
                                                     :class="{'active':item.type!='gift'&&item.num<item.buy_limit}"
                                                     @click="cartEdit(item,1)">
                                                    <i class="iconfont icon-add"></i>
                                                </div>
                                            </div>
                                            <div
                                                    @click="cartDelete(item)"
                                                    class="delete" v-if="item.price">
                                                <i class="iconfont icon-delete"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="append flex" v-if="item.sel_status">
                                    <div v-for="service in item.serviceList"
                                         :key="service.service_goods_id">
                                        <div class="insurance">
                                            <div class="i1">
                                                <img v-lazy="service.service_image_url">
                                            </div>
                                            <div class="i2">
                                                <span> {{service.service_short_name}} {{service.service_price}}元</span>
                                            </div>
                                            <div class="i3" @click="onCartSelService(item)">
                                                <span>选购</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ol>
                        <div class="point-box">
                            <div class="point">
                                <span class="act act_gift">赠品</span>
                                <span>赠小米蓝牙耳机</span>
                            </div>
                            <div class="point">
                                <span class="act act_special">活动</span>
                                <span>下单立减100元</span>
                            </div>
                            <div class="point" style="display: none;">
                                <span class="act act_special">包邮</span>
                                <span></span>
                            </div>
                            <div class="point">
                                <p>温馨提示：产品是否购买成功，以最终下单为准，请尽快结算</p>
                            </div>
                        </div>
                        <div class="ui-line"></div>
                    </div>
                </div>
                <div class="bottom-submit box-flex">
                    <div class="price-box flex">
                        <span>共13件 金额：</span>
                        <br>
                        <strong>10153</strong>
                        <span>元</span>
                    </div>
                    <a href="/category" class="btn disable black flex">继续购物</a>
                    <a class="btn flex">去结算</a>
                </div>
                <div class="insurance-pop">
                    <div class="ui-mask" v-if="showServiceInfo"></div>
                    <div class="pop" v-if="showServiceInfo">
                        <div class="close">
                            <i class="image-icons iconfont icon-close" @click="showServiceInfo=false"></i>
                        </div>
                        <div class="h1">购买服务</div>
                        <div class="max5">
                            <div
                                    v-for="service_type in current_service_types.list"
                                    class="border-top-1px mt2x">
                                <div
                                        v-if="service_type.listUnderType.length"
                                        class="option-title pt32">
                                    {{service_type.type_name}}
                                    <a href="//cdn.cnbj0.fds.api.mi-img.com/b2c-data-mishop/72d5bc482304.html"
                                       class="service-url">
                                        <!-- <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjhFNUZBNEJBNjg2MTFFN0JGODNEMTFGMzE1NTJDREYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjhFNUZBNENBNjg2MTFFN0JGODNEMTFGMzE1NTJDREYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGNEE0ODY5NEE2NzUxMUU3QkY4M0QxMUYzMTU1MkNERiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyOEU1RkE0QUE2ODYxMUU3QkY4M0QxMUYzMTU1MkNERiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqoKySAAAALWSURBVHjatJfPS1RRFMef9002Q9BiRlPIzE2TusgWQZQFFS364aJwUZBEYW3atAv6S1y0K3chSEUbqQaSQoqKirJGwppxMaZvIaSTaPo98L1xebxf900d+KDMu/d+7zn33PPOa3KSmQuKYA/YBQogy2d1sAgqoAy+gvW4BZtinufAEXAIzINpMAsWwIoxpgV0gW7QBl6ASWOMlfB+MEAPnoGfCaMjmzjBCD0C7xLOcxQ4D24xrGlN5t7mWirOYxkwBJrBPfDbacy2gcvgFxgFf8KEz4F2cCckQeQ8DzLJJMHyoAo8JtZUSGIOM0fGzR+19YHDFA3ytAPcBL0UzfH37UyoXibYZ7BmzNsAH8EZel4zhWWRq+AuM9Zv4tkNjpNMnQAl8IZCeW6gwCiWffPXed0ugFeyMS18nLt5GXJWQ/RKbAS8Z3g9eiAh7qF4F6/Smm+NJa6xA3xT9Fru6ZMQ0TzP1KFANWTclO9YguwptVzF+zbP6uNELOqFJI82z7fZIFukVjFD4emYBccSXJ2dxv9zEeNEa6/ihO8N3tcO5onDxKpGjP0hmuJxq0U5DLJ9YJAZX2WhiDIJdUuGb5l6StFBFhTt6WjUi4Emz7OZBjw9Zog+5r1ObIreZi1Fc8aZ2orK3LpipWpNkUy6ZJYs54rWgmJC7E4Z7nKKOaI15zLcB8Bri8mSIDOs00uWwqekxit2GG0s8DbCcfc1yAqs1V9cvraaWeQ/WZyx3qxnITzASM3olmSSjVrSVuc0uE5sWqFuav3thSR0D8Altiv/2raCi+ChLjBmB1Jjh9gP3vIIwmwL29wy/8b15FfYCJSSNHvSjaz+r2bP9Q0ULz+ATvZIlRTXxTzTa3zz3TdFg4S1uLwzl9kjtfMYli0a+rPgpFFON9J8whxlu1JjwZhlJ2F+whTYa/Xwmknv9jztJ0zQR1uRIcwbtXqFd7nCYpToo21TgAEAWy6shL93DD4AAAAASUVORK5CYII="> -->
                                        <i class="iconfont icon-question"></i>
                                    </a>
                                </div>
                                <div
                                        v-for="option in service_type.listUnderType"
                                        class="options-group">
                                    <div class="align-center justify-start layout wrap">
                                        <div
                                                @click="checkOption(option)"
                                                :class="{'on':option.checked}"
                                                class="option-item border-1px align-center justify-center ui-flex">
                                            <p>{{option.service_short_name}} {{option.service_price}}元</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="btn-bottom align-center justify-canter layout">
                            <div class="flex">{{servicesMessage}}</div>
                            <div class="btn" @click="cartSelService()">确定</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Prop, Watch} from "vue-property-decorator";
    import fetch from '@/api/fetch'
    import Title from "@/components/Title.vue"

    import {cartIndex} from "@/mock/cart.js"

    import Component from 'vue-class-component'

    Component.registerHooks([
        'beforeRouteEnter',
        'beforeRouteUpdate',
        'beforeRouteLeave'
    ])

    @Component({components: {Title}})
    export default class MailCart extends Vue {

        cartList = []
        serviceSelected = []
        giftSelected = []
        current_service_types = []
        showServiceInfo = false

        get checkedServices() {

            let checkedServices = []

            this.current_service_types.list.forEach((item: any) => {
                item.listUnderType.forEach((item2: any) => {
                    if (item2.checked) {
                        checkedServices.push({
                            service_goods_id: item2.service_goods_id,
                            service_image_url: item2.service_image_url,
                            service_short_name: item2.service_short_name,
                            service_price: item2.service_price,
                            type_name: item2.type_name,
                        })
                    }
                })
            })

            return checkedServices
        }

        get servicesMessage() {
            return this.checkedServices.length ? `已选择${this.checkedServices.length}项服务` : '请选择服务类型'
        }

        // 商品（选中或不选中），服务（被选中）可以删除
        cartDelete(good: object) {

            // 要删除的是 service
            if (good.type && good.type == 'service') {
                console.log('is service');

                // 从 cartList 中删除该服务
                let goodIndex = this.cartList.findIndex((item: any) => {
                    return item.goodsId == good.goodsId
                })
                this.cartList.splice(goodIndex, 1)

                let serviceIndex=this.serviceSelected.findIndex((item:any)=>{
                    return item.service_goods_id==good.goodsId
                })

                let parentGoodIndex=this.cartList.findIndex((item: any) => {
                    return item.goodsId == good.parent_goodsId
                })


                // 向 good.serviceList 插入该服务
                this.cartList[parentGoodIndex].serviceList.push({
                    service_goods_id:good.goodsId,
                    service_image_url: good.image_url,
                    service_short_name: good.product_name,
                    service_price: good.price,
                    type_name: this.serviceSelected[serviceIndex].type_name
                })

                // serviceSelected 删除该服务
                this.serviceSelected.splice(serviceIndex,1)



            } else {
                // 要删除的是商品
                console.log('is good');
                let goodIndex = this.cartList.findIndex((item: any) => {
                    return item.goodsId == good.goodsId
                })

                // 从 cartList 中删除该商品
                this.cartList.splice(goodIndex, 1)

                // 从 cartList 中删除该商品对应的 service 和 gift
                this.cartList = this.cartList.filter((item: any) => {

                    // 是商品，或者是服务或赠品但不对应该商品 则保留
                    if (item.type=='good'||(item.parent_goodsId&&item.parent_goodsId!=good.goodsId)) {
                        return true
                    } else {
                        return false
                    }
                })
            }
        }


        cartSelService() {
            this.$fetch('cartSelService', {
                'parent_goodsId': this.checkedServices.parent_goodsId,
                'service_goods_Id': 'xjbx'
            }).then(res => {
                this.addServiceToCartList(this.checkedServices, this.cartList, this.current_service_types.parent_goodsId)
                this.showServiceInfo = false
            })
        }

        beforeRouteEnter(to: any, from: any, next: any) {
            if (!from.name) {
                // 刷新
                next((vm: any) => vm.getList())
            } else {
                // 路由切换
                fetch('cartIndex', {}).then(res => {
                    next((vm: any) => vm.setList(res))
                })
            }
        }

        onCartSelService(good: object) {
            let service_types = {}
            service_types.parent_goodsId = good.goodsId
            service_types.list = []

            // 将 serviceList 按 type_name 分类
            good.serviceList.forEach((service: any) => {

                let index = service_types.list.map(item => item.type_name).indexOf(service.type_name)

                let newService = {
                    service_goods_id: service.service_goods_id,
                    service_image_url: service.service_image_url,
                    service_short_name: service.service_short_name,
                    service_price: service.service_price,
                    type_name: service.type_name,
                    checked: false
                }


                if (index == -1) {
                    service_types.list.push({
                        type_name: service.type_name,
                        listUnderType: [newService],
                        parent_goodsId: good.goodsId
                    })
                } else {
                    service_types.list[index].listUnderType.push(newService)
                }
            })

            this.current_service_types = service_types

            this.showServiceInfo = true
        }

        checkOption(option: object) {
            option.checked = !option.checked
        }

        updateRelativeAmount(good: object) {
            // 处理商品对应的 gift 和 service 的数量
            // 商品增加，则对应选中的 gift 增加，对应选中的 service 数量上限增加
            this.cartList.forEach((item: object) => {

                // 是商品对应 gift 或 service
                if (item.parent_goodsId && item.parent_goodsId == good.goodsId) {
                    item.buy_limit = good.num
                    if (item.type == 'gift') {
                        item.num = good.num
                    }

                }
            })
        }

        cartEdit(good: object, payload: number) {

            if (good.num == 1 && payload == -1) return
            if (good.num == good.buy_limit && payload == 1) return
            let consumption = payload ? 2 : 1
            this.$fetch('cartEdit', {
                'goodsId': good.goodsId,
                consumption
            }).then(res => {
                good.num += payload
                this.updateRelativeAmount(good)
            })
        }

        initialServiceSelected(items: any) {
            // 所有被选中的服务集合
            let serviceSelected = []
            items.forEach((item: any) => {
                if (item.service_info) {
                    // 某商品对应的未被选中的服务集合
                    item.serviceList = []
                    item.service_info.forEach((list: any) => {
                        list.service_info.forEach((info: any) => {
                            if (info.sel_status) {
                                serviceSelected.push({

                                    service_goods_id: info.service_goods_id,
                                    service_image_url: info.service_image_url,
                                    service_short_name: info.service_short_name,
                                    service_price: info.service_price,
                                    type_name: list.type_name,
                                    parent_goodsId: item.goodsId
                                })
                            } else {
                                item.serviceList.push({
                                    service_goods_id: info.service_goods_id,
                                    service_image_url: info.service_image_url,
                                    service_short_name: info.service_short_name,
                                    service_price: info.service_price,
                                    type_name: list.type_name,
                                })
                            }
                        })
                    })
                }
            })
            return serviceSelected
        }

        addServiceToCartList(services: any, items: any, Id?: string) {


            // 将被选中的服务添加到商品列表中，注意页面上被选中服务总位于对应商品下方，所以需要 parent_goodsId
            services.forEach((info: any) => {

                let index = items.findIndex((item: any) => {

                    if (Id) {
                        return item.goodsId == Id
                    } else {
                        return item.goodsId == info.parent_goodsId
                    }
                })

                // 将服务添加至对应商品后面
                items.splice(index + 1, 0, {
                    goodsId: info.service_goods_id,
                    image_url: info.service_image_url,
                    buy_limit: items[index].buy_limit,
                    //sel_status: 0,
                    product_name: info.service_short_name,
                    price: info.service_price,
                    num: 1,
                    type: 'service',
                    parent_goodsId:items[index].goodsId
                })


                if (Id) {

                    // 将服务从 items[index].serviceList 中剔除
                    let serviceIndex = items[index].serviceList.findIndex((item: any) => {
                        return info.service_goods_id == item.service_goods_id
                    })
                    items[index].serviceList.splice(serviceIndex, 1)

                    // 将服务加入到 serviceSelected 中
                    this.serviceSelected.push({
                        service_goods_id: info.service_goods_id,
                        service_image_url: info.service_image_url,
                        service_short_name: info.service_short_name,
                        service_price: info.service_price,
                        type_name: info.type_name,
                        parent_goodsId: Id
                    })
                }


            })
        }

        initialGiftSelected(items: any) {
            // 同理，gift 也作为商品放入商品列表中
            let giftSelected = []
            items.forEach((item: any, index: number) => {
                // 没有被选中的商品，其对应 gift 不予显示
                if (item.gift && item.sel_status) {
                    item.gift.forEach((gift: any) => {
                        giftSelected.push({...gift, parent_goodsId: item.goodsId})
                    })
                }
            })
            return giftSelected
        }

        // 传入 Id 说明是 check 函数调用，否则就是 setList 函数调用
        addGiftToCartList(gifts: any, cartList: any, Id?: string) {
            gifts.forEach((gift: any) => {
                let index = cartList.findIndex((item: any) => {

                    if (Id) {
                        return item.goodsId == Id
                    } else {
                        return item.goodsId == gift.parent_goodsId
                    }
                })

                // 将 gift 添加至对应商品后面
                cartList.splice(index + 1, 0, {
                    goodsId: gift.actId,
                    image_url: gift.image_url,
                    buy_limit: cartList[index].buy_limit,
                    product_name: gift.product_name,
                    num: cartList[index].num,
                    parent_goodsId: Id ? Id : gift.parent_goodsId,
                    type: 'gift'
                })

                Id && this.giftSelected.push({...gift, parent_goodsId: Id})
            })
        }

        getList() {
            this.$fetch('cartIndex', {}).then(res => {
                this.setList(res)
            })
        }

        setList(res: any) {
            let items = cartIndex.data.items

            let serviceSelected = this.initialServiceSelected(items)
            this.addServiceToCartList(serviceSelected, items)

            let giftSelected = this.initialGiftSelected(items)
            this.addGiftToCartList(giftSelected, items)

            this.serviceSelected = serviceSelected

            this.giftSelected = giftSelected

            this.cartList = this.initialCartList(items)

            this.$store.commit('setViewLoading', false)
            this.$NProgress.done()
        }

        initialCartList(items:any){
            let dealed=[]

            items.forEach((item:any)=>{
                if(!item.type){

                    console.log('item is good');
                    console.log(item);
                    dealed.push({
                        goodsId: item.goodsId,
                        image_url: item.image_url,
                        buy_limit: item.buy_limit,
                        sel_status: item.sel_status,
                        product_name: item.product_name,
                        price: item.price,
                        num: item.num,
                        type: 'good',
                        serviceList:item.serviceList,
                        gift:item.gift
                    })
                }else {
                    //console.log(item);
                    dealed.push(item)
                }
            })
            return dealed
        }



        dealServiceSelected(good: object) {

            this.serviceSelected.forEach((service: any, serviceIndex: any) => {


                // 找到该商品对应的已选中服务
                if (service.parent_goodsId == good.goodsId) {

                    let goodIndex = this.cartList.findIndex((item: any) => {
                        return item.goodsId == service.service_goods_id
                    })
                    // 从商品列表中剔除该商品对应的已选中服务
                    this.cartList.splice(goodIndex, 1)
                    // 将 service 放入该商品对应 serveiceList 中，以表示该服务由已选变为未选
                    good.serviceList.push({

                        service_goods_id: service.service_goods_id,
                        service_image_url: service.service_image_url,
                        service_short_name: service.service_short_name,
                        service_price: service.service_price,
                        type_name: service.type_name,
                    })
                }
            })

            // 从 serviceSelected 中剔除 service
            this.serviceSelected = this.serviceSelected.filter((item: any) => item.parent_goodsId != good.goodsId)
        }

        dealGift(good: object) {

            this.giftSelected.forEach((gift: any, giftIndex: number) => {
                // 找到该商品对应的 gift
                if (gift.parent_goodsId == good.goodsId) {
                    let goodIndex = this.cartList.findIndex((item: any) => {
                        return item.goodsId == gift.actId
                    })
                    // 从商品列表中剔除该商品对应的 gift
                    this.cartList.splice(goodIndex, 1)
                }
            })

            // 从 giftSelected 中剔除 gift
            this.giftSelected = this.giftSelected.filter((item: any) => item.parent_goodsId != good.goodsId)
        }

        uncheck(good: object) {
            good.sel_status = 0

            this.$fetch('cartSelect', {
                'goodsId': good.goodsId,
                'sel_status': good.sel_status
            }).then(res => {
                this.dealServiceSelected(good)
                this.dealGift(good)
            })
        }

        check(good: object) {
            good.sel_status = 1

            this.$fetch('cartSelect', {
                'goodsId': good.goodsId,
                'sel_status': good.sel_status
            }).then(res => {
                // 将该商品的 gift 转化为商品
                if (!good.gift) return;

                this.addGiftToCartList(good.gift, this.cartList, good.goodsId)
            })
        }

        /***
         * 商品选中/取消选中逻辑：
         * 1. 选中商品后，将其 gift 转化为商品。展示其 gift，展示其 serviceList（此时该商品对应所有 service 全部未选中）。
         * 2. 取消选中商品后，将其 gift 从商品列表中剔除。将其 serviceSelected 中对应服务全部放入该商品的 serviceList 中（表示该商品对应服务全部未选中）。
         */
        cartSelect(good: object) {
            // 取消选中
            if (good.sel_status == 1) {
                this.uncheck(good)
            } else {
                this.check(good)
            }
        }
    }

</script>
<style scoped>
    .nologin > a {
        height: 52px;
        padding: 0 28px 0 16px;
        position: relative;
        color: rgba(0, 0, 0, .54);
    }

    .nologin > a:after {
        content: "";
        position: absolute;
        right: 16px;
        top: 50%;
        width: 9px;
        height: 9px;
        border-left: 1px solid currentColor;
        border-top: 1px solid currentColor;
        transform: translate3d(0, -50%, 0) rotate(135deg);
    }

    .nologin > a span {
        font-size: 16px;
        color: rgba(0, 0, 0, .87);
        display: block;
        text-align: left;
    }

    .nologin > a em {
        font-style: normal;
        font-size: 14px;
        text-align: right;
    }

    .cart-list {
        background: #fff;
    }

    .cart-list .item {
        border-bottom: 1px solid #f6f6f6;
        line-height: 0;
    }

    .cart-list .item .ui-flex {
        padding: 12px 0;
    }

    .cart-list .item .choose {
        -webkit-box-flex: 0;
        flex: none;
        width: 30px;
        padding: 0 4px;
        height: 90px;
    }

    .cart-list .item .choose i {
        font-size: 24px;
        line-height: 90px;
        color: #ddd;
    }

    .cart-list .item .choose.checked i {
        color: #f56600;
    }

    /* .cart-list .item .choose.checked {
      background: url(//s1.mi.com/m/images/m/check_press.png) 50% 50% no-repeat;
      background-size: 20px 20px;
    } */
    .cart-list .item .imgProduct {
        -webkit-box-flex: 0;
        flex: none;
        display: block;
        position: relative;
        width: 90px;
        height: 90px;
        margin-right: 10px;
        border: 1px solid #eee;
        border-radius: 2px;
    }

    .cart-list .item .imgProduct img {
        width: auto;
        height: 100%;
    }

    .cart-list .item .info {
        text-align: left;
    }

    .cart-list .item .info .name {
        font-size: 14px;
        line-height: 16px;
        color: #666;
        margin-bottom: 6px;
        margin-right: 15px;
        display: -webkit-box;
        display: box;
        box-align: start;
    }

    .cart-list .item .info .name span {
        display: block;
    }

    .cart-list .item .info .price-without {
        padding: 6px 0;
        font-size: 12px;
        color: #999;
        margin-bottom: 6px;
    }

    .cart-list .item .info .price-without span {
        margin-right: 5px;
    }

    .cart-list .item .info .xm-input-number {
        display: inline-block;
        border: 1px solid #eee;
    }

    .cart-list .item .info .xm-input-number .input-sub {
        display: inline-block;
        width: 30px;
        height: 30px;
        position: relative;
        vertical-align: middle;
        background-color: #fafafa;
        text-align: center;
    }

    .cart-list .item .info .xm-input-number .input-num {
        display: inline-block;
        vertical-align: middle;
        min-width: 30px;
        padding: 0 6px;
        text-align: center;
        font-size: 16px;
    }

    .cart-list .item .info .xm-input-number .input-add,
    .cart-list .item .info .xm-input-number .input-sub {
        display: inline-block;
        width: 30px;
        height: 30px;
        position: relative;
        vertical-align: middle;
        background-color: #fafafa;
        text-align: center;
    }

    .cart-list .item .info .xm-input-number .input-add.active,
    .cart-list .item .info .xm-input-number .input-sub.active {
        background-color: #f4f4f4;
    }

    .cart-list .item .info .xm-input-number .input-add.active .image-icon,
    .cart-list .item .info .xm-input-number .input-sub.active .image-icons {
        opacity: 1;
    }

    /* .cart-list .item .info .xm-input-number .icon-line {
      background-image: url(../assets/images/icon-line.png);
    }
    .cart-list .item .info .xm-input-number .icon-cross {
      background-image: url(../assets/images/icon-cross.png);
    }
    .cart-list .item .info .xm-input-number .image-icons {
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

    .cart-list .item .info .delete {
        float: right;
        margin-right: 10px;
        display: block;
    }

    .cart-list .item .info .delete .icon-delete {
        /* width: 30px;
        height: 30px;
        background-image: url(../assets/images/icon-delete.png); */
        font-size: 20px;
        line-height: 30px;
    }

    .cart-list .item .append .insurance {
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        border: 1px solid #f6f6f6;
        padding: 7px 10px;
        border-radius: 2px;
        background: #f6f6f6;
        font-size: 12px;
        margin: 0 10px 10px;
    }

    .cart-list .item .append .insurance .i1 {
        margin-right: 6px;
    }

    .cart-list .item .append .insurance .i1 img {
        width: 25px;
        height: 25px;
    }

    .cart-list .item .append .insurance .i2 {
        -webkit-box-flex: 1;
        box-flex: 1;
        flex: 1;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        padding-right: 10px;
    }

    .cart-list .item .append .insurance .i2 span {
        -webkit-box-flex: 1;
        flex: 1;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-all;
        overflow: hidden;
        height: 25px;
        line-height: 25px;
        text-align: left;
    }

    .cart-list .item .append .insurance .i3 {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        width: 38px;
        color: #ff5722;
    }

    .cart-list .point-box {
        background: #fff;
    }

    .cart-list .point-box .point {
        font-size: 11px;
        color: #999;
        border-top: 1px solid #f6f6f6;
        padding: 10px 15px;
        text-align: left;
    }

    .cart-list .point-box .point .act.act_gift {
        background: #5b77d6;
    }

    .cart-list .point-box .point .act {
        border-radius: 2px;
        color: #fff;
        padding: 1px 3px;
        margin-right: 5px;
    }

    .cart-list .point-box .point .act.act_special {
        background: #e53935;
    }

    .bottom-submit {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        z-index: 99;
        box-shadow: 0 3px 14px 2px rgba(0, 0, 0, .12);
    }

    .bottom-submit .price-box {
        font-size: 13px;
        color: #999;
        width: 100%;
        text-align: center;
        padding-top: 7px;
    }

    .bottom-submit .price-box strong {
        font-size: 20px;
        color: #ff5722;
        margin-right: .2em;
    }

    .bottom-submit .disable {
        background: #f4f4f4;
        /* border: 1px solid #f4f4f4; */
    }

    .bottom-submit .black {
        color: #333;
    }

    .bottom-submit .btn {
        display: block;
        width: 100%;
    }

    .pop .close .icon-close {
        /* width: 20px;
        height: 20px;
        background-image: url(../assets/images/icon-close.png); */
        font-size: 20px;
        line-height: 20px;
        color: #bababa;
    }

    .pop .h1 {
        color: rgba(0, 0, 0, .87);
        font-size: 16px;
        text-align: center;
        padding: 12px 0;
    }

    .pop .option-title {
        position: relative;
        padding-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgba(0, 0, 0, .87);
    }

    .pop .service-url {
        display: inline-block;
        width: 14px;
        height: 14px;
        /* margin-left: 5px; */
        vertical-align: middle;
    }

    /* .pop .service-url img {
      width: auto;
      height: 90%;
    } */
    .pop .service-url i {
        font-size: 16px;
        left: 14px;
        color: #999;
    }

    .pop .options-group {
        padding-bottom: 16px;
    }

    .pop .option-item {
        height: 36px;
        line-height: 36px;
        width: 49%;
        box-sizing: border-box;
        padding: 0 4px;
        text-align: center;
        margin: 8px 8px 0 0;
        font-size: 12px;
    }

    .pop .option-item.on {
        color: #f56600;
    }

    .pop .option-item.on:before {
        border-color: #f56600;
    }

    .pop .btn-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .pop .btn-bottom .flex {
        padding-left: 16px;
        color: rgba(0, 0, 0, .54);
        font-size: 12px;
    }

    .pop .btn-bottom .btn {
        width: 50%;
        background-color: #f56600;
        color: #fff;
        font-size: 16px;
        line-height: 47px;
    }
</style>