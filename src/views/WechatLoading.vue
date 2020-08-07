<template>
    <van-row justify="center">
        <div style="margin-top: 50%">
            <van-loading size="36"/>
            加载中...
        </div>
    </van-row>


</template>

<script>

    import Vue from 'vue';
    import {Loading, Col, Row} from 'vant';

    Vue.use(Loading);
    Vue.use(Col);
    Vue.use(Row);
    export default {
        name: "WechatLoading"
    }
</script>

<style scoped>

</style>
