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
    import {Loading, Col, Row, Toast} from 'vant';
    import {mapActions, mapState, mapMutations} from 'vuex';

    Vue.use(Loading);
    Vue.use(Col);
    Vue.use(Row);
    Vue.use(Toast);
    export default {
        name: "WechatLoading",
        data() {
            return {
                loginParams: {
                    'code': this.$route.query.code,
                }
            }
        },
        methods: {
            ...mapActions([
                'wxLogin',
            ]),
            ...mapMutations([
                'SET_LOGIN_FAIL',
                'SET_ROLE'
            ]),
        },
        watch: {
            user_role(value) {
                if(value){
                    if (value === 1) { //数据输入角色
                        this.SET_ROLE();
                        this.$router.replace({
                            path: '/input'
                        })
                    }
                    if (value === 2) { //管理
                        this.SET_ROLE();
                        this.$router.replace({
                            path: '/statistics'
                        })
                    }
                }
            },
            loginFail(value) {
                if(value){
                    Toast(value);
                }
                this.SET_LOGIN_FAIL();
            },
            code() {
                this.$router.replace({
                    path: '/bindUser'
                })
            }
        },
        mounted() {
            this.loginParams.code = this.$route.query.code;
            this.wxLogin(this.loginParams);
        },
        computed: {
            ...mapState({
                access_token: state => state.access_token,
                code: state => state.code,
                user_role: state => state.user_role,
                loginFail: state => state.loginFail,
            }),
        },
    }
</script>

<style scoped>

</style>
