<template>
    <div class="insurance-pop">
        <div v-show="value&&overlay"
             :class="overlayClass"
             :style="overlayStyle"
             @click="clickOverlay">
        </div>
        <transition :name="transition">
            <div v-show="value" class="pop">
                <div class="close" @click="close">
                    <i class="image-icons iconfont icon-close"></i>
                </div>
                <slot></slot>
            </div>
        </transition>
    </div>
</template>


<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop} from "vue-property-decorator";

    @Component
    export default class MailPop extends Vue {

        @Prop({required:true,default:false}) value!: boolean;
        @Prop({default:true}) overlay?: boolean;
        @Prop({default:'ui-mask'}) overlayClass?: string;
        @Prop() overlayStyle?: object;
        @Prop({default:false}) closeOnClickOverlay?: boolean;
        @Prop({default:'bottom-up'}) transition?: string;

        close () {
            this.$emit('input', false)
        }
        clickOverlay () {
            if (!this.closeOnClickOverlay) return
            this.close()
        }
    }

</script>
<style scoped>
    .bottom-up-enter-active, .bottom-up-leave-active {
        transition: all .5s;
    }
    .bottom-up-enter {
        transform: translateY(100%);
    }
    .bottom-up-enter-to, .bottom-up-leave {
        transform: translateX(0);
    }
    .bottom-up-leave-to {
        transform: translateY(100%);
    }
</style>