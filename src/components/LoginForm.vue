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
            <input class="item_account" :placeholder="usernamePlaceholder" type="text" @input="clearError" v-model="userName">
        </label>
        <label class="pwd_panel">
            <input class="item_account" type="number" :placeholder="passwordPlaceholder" @input="clearError" v-model="password">
            <a v-if="!loginwithUserName" class="sms_code" @click="getCode">{{codeMsg}}</a>
        </label>
        <!-- 错误信息 -->
        <div class="err_tip" v-if="errMsg">
            <!-- <em class="icon_error">err</em> -->
            <i class="icon_error iconfont icon-error"></i>
            <span class="error-con">{{errMsg}}</span>
        </div>
        <div class="btns_bg">
            <button class="btnadpt">
                <i></i>
                {{submitMessage}}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop} from "vue-property-decorator";

    @Component
    export default class LoginForm extends Vue {
        errMsg=''
        countdown=0
        userName=''
        password=''
        timer=0
        @Prop(Boolean) readonly loginwithUserName!: boolean
        @Prop({default: 60}) readonly maxCountdown!: number

        get usernamePlaceholder() {
            return this.loginwithUserName ? '邮箱/手机号码/小米ID' : '手机号码'
        }

        get passwordPlaceholder() {
            return this.loginwithUserName ? '密码' : '短信验证码'
        }

        get submitMessage() {
            return this.loginwithUserName ? '登录' : '立即登录注册'
        }
        get codeMsg(){
            return this.countdown===this.maxCountdown?'获取验证码':`重新发送${this.countdown}`
        }

        created(){
            this.countdown=this.maxCountdown
        }

        getCode () {
            // 已发送验证码，则点击无效
            if (this.countdown !== 60) return
            if (!this.userName) {
                this.errMsg = '请输入手机号'
                return
            }
            if (!this.checkMobile()) {
                this.errMsg = '手机号码格式不正确'
                return
            }


            this.$fetch('getCode', { username: this.userName }).then((res: any) => {
                console.log('res');
                console.log(res);
                this.timer = setInterval(() => {
                    this.countdown--
                    if (this.countdown === 0) {
                        clearInterval(this.timer)
                        this.countdown = 60
                    }
                }, 1000)

            })
        }
        checkMobile () {
            const reg = /^((1[3-8][0-9])+\d{8})$/
            return reg.test(this.userName)
        }


        clearError(){
            this.errMsg=''
        }
    }

</script>
<style scoped lang="scss">
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
</style>