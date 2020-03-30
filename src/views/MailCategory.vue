<template>
    <div class="app-shell">
        <Title title="分类" />
<!--        <img v-if="loading" src="../assets/images/loading.png" alt="" class="loading_img">-->
        <div class="app-view-wrapper">
            <div class="container app-view app-view-with-header app-view-with-footer">
                <div class="list-navbar">
                    <ul>
                        <li
                                v-for="(list,index) in categoryList"
                                :key="index"
                                :class="index==curIndex?'active':''"
                                @click="changeIndex(index)">
                            <a>
                                <span>{{list.category_name}}</span>
                            </a>
                        </li>
                    </ul>
                </div>


                <div class="list-wrap" @touchstart="wrapScroll">
                    <div
                            v-for="(list,index) in categoryList"
                            :key="list.category_id"
                            :ref="'category'+index"
                            class="list-item">
                        <div class="component-list-main">
                            <div class="cells_auto_fill">
                                <a class="exposure items">
                                    <img :scr="list.category_img">
                                </a>
                            </div>
                            <template v-for="(item,index) in list.category_list">
                                <div :key="'title'+index" class="category_title">
                                    <span>{{item.category_title}}</span>
                                </div>
                                <CategoryGroup :key="index" :products="item.category_group"/>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Nav/>
    </div>
</template>


<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop, Watch} from "vue-property-decorator";
    import CategoryGroup from "@/components/CategoryGroup.vue";
    import Title from "@/components/Title.vue"

    @Component({components:{CategoryGroup,Title}})
    export default class MailCategory extends Vue {
        categoryList=[]
        curIndex=0
        loading=true
        offsetTop:any[]=[]
        scrollTimer=0
        created(){
            this.getList()
        }
        @Watch('curIndex')
        oncurIndexChanged(val:number,oldVal:number){
            let listWrap = document.querySelector('.list-wrap')
            let top = this.offsetTop[val]
            listWrap!.removeEventListener('scroll', this.scrollHandler)
            listWrap!.scrollTo(0, top)
        }

        wrapScroll(){
            let listWrap = document.querySelector('.list-wrap')
            listWrap&&listWrap.addEventListener('scroll',this.scrollHandler)
        }
        scrollHandler(){
            // 这里做了一个防抖
            if(this.scrollTimer!=0){
                clearTimeout(this.scrollTimer)
            }
            this.scrollTimer=setTimeout(()=>{
                // list-wrap->navbar
                let listWrap = document.querySelector('.list-wrap')
                let currentTop=(listWrap as HTMLDivElement)!.scrollTop
                this.curIndex=this.getListIndex(currentTop)
            },100)
        }

        // 返回 currentTop 对应索引
        getListIndex(currentTop:number){
            let result=0
            for(let i=0;i<this.offsetTop.length;i++){
                if(currentTop<this.offsetTop[i]){
                    result=i
                    break
                }
            }
            return result
        }
        getList() {
            this.$fetch('category', {}).then(res => {
                this.categoryList=res.data.lists
                this.$store.commit('setViewLoading', false)
                this.$NProgress.done()
                this.$nextTick(()=>{
                    this.offsetTop=this.categoryList.map((category,index)=>(this.$refs[`category${index}`] as Array<any>)[0].offsetTop)
                })
            })
        }
        // navbar->list-wrap
        changeIndex (index:number) {
            this.curIndex = index
        }
    }

</script>

<style scoped lang="scss">
    .container {
        margin-right: auto;
        margin-left: auto;
        flex-basis: 100%;
    }
    .container .list-navbar {
        position: fixed;
        top: 49px;
        bottom: 40px;
        left: 0;
        width: 80px;
        border-right: 1px solid #efefef;
        overflow: hidden;
    }
    .container .list-navbar ul {
        z-index: 90;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        /* 隐藏滚动条 */
        right: -6px;
        padding: 8px 6px 8px 0;
        background: #fefefe;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .container .list-navbar ul li.active {
        color: #fb7d34;
        transform: scale(1);
    }
    .container .list-navbar ul li {
        font-size: 18px;
        height: 50px;
        line-height: 50px;
        overflow: hidden;
        text-align: center;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        transition: transform 0.1s linear;
        transform-origin: center center;
        transform: scale(0.76);
    }
    .container .list-navbar ul li span {
        display: inline-block;
    }
    .container .list-wrap {
        position: absolute;
        left: 80px;
        right: 0;
        top: 49px;
        bottom:  40px;
        padding: 2px 16px;
        overflow: auto;
    }
    .component-list-main .cells_auto_fill .items {
        height: auto!important;
        display: block;
    }
    .cells_auto_fill .items img{
        width: 260px;
        height: 104px;
    }
    .component-list-main .category_title {
        background: #fff;
        font-size: 16px;
        text-align: center;
        font-weight: 400;
        margin-top: 10px;
        height: 66px;
        line-height: 66px;
        overflow: hidden;
    }
    .component-list-main .category_title span {
        position: relative;
    }
    .component-list-main .category_title span:after, .component-list-main .category_title span:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        width: 30px;
        border-top: 1px solid #e0e0e0;
        transform: translate3d(-150%,-50%,0);
    }
    .component-list-main .category_title span:after {
        left: auto;
        right: 0;
        transform: translate3d(150%,-50%,0);
    }
    .component-list-main .category_group .box {
        width: 100%;
        overflow: hidden;
    }
    .box-flex>*, .box-inline-flex>* {
        flex: 1 1 auto;
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
        background: #fff;
        overflow: hidden;
    }
    .component-list-main .img {
        display: block;
        position: relative;
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
    .loading_img{
        width: 100%;
    }
</style>