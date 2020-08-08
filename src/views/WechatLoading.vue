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
                code: this.$route.query.code,
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
                'SET_LOGIN_FAIL'
            ]),
        },
        watch: {
            access_token() {
                if (this.user_role === 1) { //数据输入角色
                    this.$router.replace({
                        path: '/input'
                    })
                } else if (this.user_role === 2) {
                    this.$router.replace({
                        path: '/statistics'
                    })
                }
            },
            loginFail(value) {
                Toast.fail(value);
                this.SET_LOGIN_FAIL();
            },
            code() {
                this.$router.replace({
                    path: '/bindUser'
                })
            }
        },
        mounted() {
            this.wxLogin(this.loginParams);
            console.log('mounted:' + this.code);
            console.log(this.access_token);
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
