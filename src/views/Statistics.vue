<template>
    <van-row>
        <van-col span="24">
            <van-divider content-position="left"
                         :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
            >数据统计
            </van-divider>
        </van-col>
    </van-row>
</template>

<script>
    import Vue from 'vue';
    import {Divider} from 'vant';
    import {mapState} from 'vuex';

    Vue.use(Divider);
    export default {
        name: "Statistics",
        methods: {
            checkRole() {
                if(this.user_role == 1){
                    this.$router.replace({
                        path: '/input'
                    })
                }
            }
        },
        mounted() {
            this.checkRole();
        },
        computed: {
            ...mapState({
                user_role: state => state.user_role,
            }),
        },
    }
</script>

<style scoped>

</style>
