<template>
    <div class="category_group box-flex">
        <div class="box">
            <router-link
                    v-for="product in products"
                    :key="product.category_id"
                    class="product"
                    tag="div"
                    :to="{name: 'list', params: {id: product.category_id}}">
                <a class="exposure item">
                    <div class="img">
                        <img class="big" v-lazy="product.img_url">
                    </div>
                    <div class="name">{{product.product_name}}</div>
                </a>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop} from "vue-property-decorator";

    @Component
    export default class CategoryGroup extends Vue {
        @Prop({required:true}) readonly products!: any[]
    }
</script>

<style scoped lang="scss">
    .component-list-main .category_group .box {
        width: 100%;
        overflow: hidden;
    }
    .component-list-main .category_group .product {
        float: left;
        width: 33.333333333333336%;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 15px;
        overflow: hidden;
    }
    .component-list-main .category_group .product .img {
        width: 52px;
        height: 52px;
        margin: 0 auto;
        background: #f2f2f2;
        overflow: hidden;
    }
    .component-list-main .category_group .product .img img {
        width: 100%;
    }
    .category_group .big {
        height: 100%!important;
        width: auto!important;
    }
    .component-list-main .category_group .name {
        margin-top: 14px;
        white-space: nowrap;
        font-size: 12px;
        color: rgba(0,0,0,.54);
    }
</style>