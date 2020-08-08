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
                    'code': this.code,
                },
            }
        },
        methods: {
            ...mapActions([
                'bindUser',
            ]),
            ...mapMutations([
                'SET_LOGIN_FAIL'
            ]),
            onBindSubmit() {
                this.bindUser(this.bindParams)
            }
        },
        watch: {
            user_role() {
                if (this.user_role === 1) { //数据输入角色
                    this.$router.replace({
                        path: '/input'
                    })
                }
                if (this.user_role === 2) { //管理
                    this.$router.replace({
                        path: '/statistics'
                    })
                }
            },
            loginFail(value) {
                Toast.fail(value);
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
