<template>
    <div>
        <div>{{userInfo}}</div>
        <div>{{isLogin}}</div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop} from "vue-property-decorator";
    import {mapGetters, mapState} from "vuex";

    @Component({
        computed: {...mapState(['userInfo']), ...mapGetters(['isLogin'])},
    })
    export default class MailUser extends Vue {
    }

</script>
<style scoped>

</style>