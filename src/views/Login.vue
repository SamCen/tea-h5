<template>
    <van-tabs v-model="active">
        <van-tab name="pwd" title="账号密码登录" style="font-size: large">
            <van-form @submit="onSubmit" validate-first @failed="onFailed">
                <div class="field-login van-hairline--bottom">
                    <van-field
                            readonly
                            clickable
                            name="username"
                            :value="loginParams.username"
                            label="用户名"
                            placeholder="选择要登录的用户"
                            :rules="[{ required: true, message: '请选择用户' }]"
                            @click="showUserSelect"
                    />
                </div>
                <van-popup v-model="userSelectShow" position="bottom">
                    <van-picker
                            title="要登录的账号"
                            show-toolbar
                            :columns="userSelectList"
                            @confirm="onConfirmUserSelect"
                            @cancel="onCancelUserSelect"

                    />
                </van-popup>
                <div class="field-login van-hairline--bottom">
                    <van-field
                            v-model="loginParams.password"
                            type="password"
                            name="password"
                            label="密码"
                            placeholder="密码"
                            :rules="[{ required: true, message: '请输入密码' }]"
                    />
                </div>
                <div style="margin: 40px;">
                    <van-button round block type="info" native-type="submit">
                        登录
                    </van-button>
                </div>
            </van-form>
        </van-tab>
        <van-tab name="openid" title="微信授权登录" style="font-size: large">
            <div class="wx-login-btn">
                <van-button round type="info" size="large" @click="wechatLogin">授权登录</van-button>
            </div>
        </van-tab>
    </van-tabs>

</template>

<script>
    import Vue from 'vue';
    import {Form, Button, Field, Tab, Tabs, Toast} from 'vant';
    import {mapActions, mapState, mapMutations} from 'vuex'
    import apis from '@/apis/apis';

    Vue.use(Button);
    Vue.use(Field);
    Vue.use(Form);
    Vue.use(Tab);
    Vue.use(Tabs);
    Vue.use(Toast);

    export default {
        name: "Login",
        data() {
            return {
                loginParams: {
                    username: '',
                    password: ''
                },
                active: 'openid',
                userSelectShow: false,
                userSelectList: [],
            }
        },
        methods: {
            ...mapActions([
                'login',
            ]),
            ...mapMutations([
                'SET_LOGIN_FAIL',
                'SET_ROLE'
            ]),
            onSubmit() {
                this.login(this.loginParams);
            },
            onFailed(errorInfo) {
                Toast.fail(errorInfo.errors[0].message)
            },
            showUserSelect() {
                this.userSelectShow = true;
            },
            onConfirmUserSelect(value) {
                this.loginParams.username = value.text;
                this.userSelectShow = false;

            },
            onCancelUserSelect() {
                this.userSelectShow = false;

            },
            queryUserSelectList() {
                apis.user.selectList().then(response => {
                    this.userSelectList = response.data.data;
                }).catch(err => {
                    console.log(err);
                    Toast.fail('网络错误')
                })
            },
            wechatLogin() {
                let redirect_uri = encodeURIComponent('http://www.samccc.cn/wechatLoading');
                let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6e99bf728fc7b9b5&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect';
                window.location.href = url;
            }
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
            }
        },
        mounted() {
            this.queryUserSelectList();
        },
        computed: {
            ...mapState({
                user_role: state => state.user_role,
                loginFail: state => state.loginFail,
            }),
        },
    }
</script>

<style scoped>
    .field-login {
        margin: 40px 20px 0 20px;
    }

    .wx-login-btn {
        margin: 30% 30px;
    }
</style>
