<template>
    <van-row>
        <van-form @submit="onBindSubmit">
            <div class="field-login van-hairline--bottom">
                <van-field
                        v-model="bindParams.phone"
                        name="phone"
                        label="手机"
                        placeholder="请输入绑定用户的手机"
                        :rules="[{ required: true, message: '请输入绑定用户的手机' }]"
                />
            </div>
            <div style="margin: 40px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </van-row>
</template>

<script>
    import Vue from 'vue';
    import {Form, Button, Field, Toast} from 'vant';
    import {mapActions, mapState, mapMutations} from 'vuex'

    Vue.use(Form);
    Vue.use(Button);
    Vue.use(Field);
    Vue.use(Form);
    Vue.use(Toast);

    export default {
        name: "BindUser",
        data() {
            return {
                bindParams: {
                    'phone': '',
                    'code': '',
                },
            }
        },
        methods: {
            ...mapActions([
                'bindUser',
            ]),
            ...mapMutations([
                'SET_LOGIN_FAIL',
                'SET_ROLE'
            ]),
            onBindSubmit() {
                this.bindParams.code = this.code;
                this.bindUser(this.bindParams)
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
        computed: {
            ...mapState({
                user_role: state => state.user_role,
                loginFail: state => state.loginFail,
                code: state => state.code,
            }),
        },
    }
</script>

<style scoped>
    .field-login {
        margin: 40px 20px 0 20px;
    }
</style>
