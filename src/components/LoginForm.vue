<template>
    <div>
        <!-- 输入框 -->
        <label class="login_user">
            <div class="country_list" v-if="!loginwithUserName">
                <div class="countrycode_selector">
            <span class="country_code">
              <tt class="countrycode-value" v-if="!loginwithUserName">+86</tt>
              <i class="icon_arrow_down"></i>
            </span>
                </div>
            </div>
            <input class="item_account" :placeholder="usernamePlaceholder" type="text" @input="clearError"
                   v-model="userName">
        </label>
        <label class="pwd_panel">
            <input class="item_account" type="number" :placeholder="passwordPlaceholder" @input="clearError"
                   v-model="password">
            <a v-if="!loginwithUserName" class="sms_code" @click="getCode">{{codeMsg}}</a>
        </label>
        <!-- 错误信息 -->
        <div class="err_tip" v-if="errMsg">
            <!-- <em class="icon_error">err</em> -->
            <i class="icon_error iconfont icon-error"></i>
            <span class="error-con">{{errMsg}}</span>
        </div>
        <div class="btns_bg">

            <button class="btnadpt submitButton" @click="onSubmit">
                <Icon v-if="loading" name="loading" class="loading"/>
                  <div :class="{loadingClass:loading}">{{submitMessage}}</div>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop} from "vue-property-decorator";
    import debounce from "@/helpers/debounce";

    @Component
    export default class LoginForm extends Vue {
        errMsg = ''
        countdown = 0
        userName = ''
        password = ''
        timer = 0
        /**
         * loading 在（verify 的执行时间+防抖的时间间隔）内为 true。
         * 如果不包含防抖的时间间隔，用户点击登录后发现过一会才出现“登录中”字样，会很生气
         */
        loading=false
        fn: null | Function = null
        @Prop(Boolean) readonly loginwithUserName!: boolean
        @Prop({default: 60}) readonly maxCountdown!: number

        get usernamePlaceholder() {
            return this.loginwithUserName ? '邮箱/手机号码/小米ID' : '手机号码'
        }

        get passwordPlaceholder() {
            return this.loginwithUserName ? '密码' : '短信验证码'
        }

        get submitMessage() {
            if(this.loading){
                return '登录中...'
            }
            else return this.loginwithUserName ? '登录' : '立即登录注册'
        }

        get codeMsg() {
            return this.countdown === this.maxCountdown ? '获取验证码' : `重新发送${this.countdown}`
        }

        created() {
            this.countdown = this.maxCountdown
            this.fn = debounce(this.verify, 3000)
        }

        getCode() {
            // 点击验证码的行为要做节流
            if (this.countdown !== 60) return
            if (!this.userName) {
                this.errMsg = '请输入手机号'
                return
            }
            if (!this.checkMobile()) {
                this.errMsg = '手机号码格式不正确'
                return
            }

            this.$fetch('getCode', {username: this.userName}).then((res: any) => {
                this.timer = setInterval(() => {
                    this.countdown--
                    if (this.countdown === 0) {
                        clearInterval(this.timer)
                        this.countdown = 60
                    }
                }, 1000)

            })
        }

        checkMobile() {
            const reg = /^((1[3-8][0-9])+\d{8})$/
            return reg.test(this.userName)
        }

        verify() {
            // 这里刻意让提交动作在5s后执行，以展示 loading 效果
            setTimeout(()=>{
                // 手机号码登录
                if (!this.loginwithUserName) {
                    if (!this.userName) {
                        this.errMsg = '请输入手机号'
                        return
                    }
                    if (!this.checkMobile()) {
                        this.errMsg = '手机号码格式不正确'
                        return
                    }
                    if (!this.password) {
                        this.errMsg = '请输入短信验证码'
                        return
                    }
                } else {
                    if (!this.userName) {
                        this.errMsg = '请输入账号'
                        return
                    }
                    if (!this.password) {
                        this.errMsg = '请输入密码'
                        return
                    }
                }
                type Data = {
                    userName: string,
                    password?: string
                    code?: string
                }

                let data: Data = {
                    userName: this.userName,
                    code: !this.loginwithUserName && this.password || undefined,
                    password: this.loginwithUserName && this.password || undefined
                }
                this.$fetch('login', data).then(res => {
                    let status = res.status
                    if (status === 200) {
                        console.log('成功登录')
                        this.$fetch('userInfo', {userName: this.userName}).then(res => {
                            this.$store.commit('setUserInfo', res.data.user)
                            // 登录完成后，我们希望是回到原来页。
                            this.$router.back()
                        })
                    } else {
                        this.errMsg = res.data.message
                    }
                }).catch(err => {
                    console.log(err)
                })
                this.loading=false


            },5000)
        }

        onSubmit() {
            this.loading=true
            this.fn && this.fn()
        }

        clearError() {
            this.errMsg = ''
        }
    }

</script>
<style scoped lang="scss">
    @import "~@/assets/_helper.scss";
    ::v-deep {
        svg.icon {
            width: 1.5em;height: 1.5em;
            fill: white;
        }
    }
    .login_user, .pwd_panel {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #d3d3d3;
    }
    .pwd_panel {
        justify-content: space-between;
    }
    .country_list {
        padding: 1px 10px 1px 0;
        margin-right: 8px;
        color: #4a4a4a;
        display: block;
        overflow: hidden;
    }
    .countrycode_selector {
        position: relative;
        animation: fade-in ease-in-out .5s;
    }
    @keyframes fade-in {
        0% {
            left: -100%;
        }
        100% {
            left: 0;
        }
    }
    .country_code {
        display: flex;
        align-items: center;
    }
    .countrycode-value {
        margin-right: 2px;
        color: #9b9b9b;
        font-size: 16px;
    }
    .icon_arrow_down {
        display: block;
        width: 6px;
        height: 6px;
        border-width: 1px;
        border-style: solid;
        border-color: transparent transparent #9b9b9b #9b9b9b;
        -webkit-transform: rotate(-135deg);
        transform: rotate(-135deg);
    }
    .item_account {
        padding: 16px 0;
    }
    .sms_code {
        color: #2ea5e5;
        font-size: 14px;
    }
    .err_tip {
        margin-bottom: 5px;
        padding-top: 14px;
        color: #F66;
        text-align: left;
        font-size: 14px;
    }
    .icon_error {
        font-size: 16px;
        margin-right: 5px;
        color: #ff6700;
    }
    .btns_bg {
        padding-top: 24px;
    }
    .btnadpt {
        width: 100%;
        padding: 12px 0;
        display: block;
        margin-bottom: 14px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
        border-radius: 6px;
        background-color: #ff6700;
    }
    .submitButton{
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    /*让loading旋转*/
    .loading {
        @include spin;
    }

    .loadingClass{
        margin-left: -150px;
    }

</style>