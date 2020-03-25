<template>
    <div>
        <!-- 输入框 -->
        <label class="login_user">
            <div class="country_list">
                <div class="countrycode_selector">
            <span class="country_code">
              <tt class="countrycode-value">+86</tt>
              <i class="icon_arrow_down"></i>
            </span>
                </div>
            </div>
            <input class="item_account" autocomplete="off" type="text">
        </label>
        <label class="pwd_panel">
            <input class="item_account" placeholder="密码" autocomplete="off">
            <i class="iconfont"></i>
        </label>
        <label class="pwd_panel">
            <input class="item_account" type="number" placeholder="短信验证码" autocomplete="off">
            <a href="javascript:;" class="sms_code">{{codeMsg}}</a>
        </label>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop} from "vue-property-decorator";

    @Component
    export default class LoginInputs extends Vue {
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
</style>