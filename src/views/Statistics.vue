<template>
    <van-row>
        <van-col span="24">
            <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px',fontSize:'20px'  }"
            >数据统计
            </van-divider>
            <van-row>
                <van-col offset="3" span="18">
                    <van-cell title="查询产品："  :style="{  padding: '0 16px',fontSize:'18px' }" :value="summaryQueryData.product_name" is-link arrow-direction="down" @click="showSelect"/>
                </van-col>
            </van-row>
            <br>
            <van-row>
                <van-col offset="3" span="18">
                    <van-cell title="开始日期："  :style="{  padding: '0 16px',fontSize:'18px' }" is-link arrow-direction="down" :value="summaryQueryData.beginDate" @click="showBeginDate"/>
                    <van-calendar :min-date="minDate" :max-date="maxDate" v-model="beginDateShow"  :show-confirm="false" @confirm="onConfirmBeginDate"/>
                </van-col>
            </van-row>
            <br>
            <van-row>
                <van-col offset="3" span="18">
                    <van-cell title="结束日期："  :style="{  padding: '0 16px',fontSize:'18px' }" is-link arrow-direction="down" :value="summaryQueryData.endDate" @click="showEndDate"/>
                    <van-calendar :min-date="minDate" :max-date="maxDate" v-model="endDateShow" :show-confirm="false" @confirm="onConfirmEndDate"/>
                </van-col>
            </van-row>
            <van-divider content-position="left"
                         :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
            >
            </van-divider>
            <van-row>
                <van-collapse v-model="activeNames">
                    <van-collapse-item  :key="index" :name=item.product_name
                                       v-for="(item,index) in sumStatisticsList">
                        <template #title>
                            <div :style="{padding: '0 16px',fontSize:'20px'}">{{item.product_name}} </div>
                        </template>
                        <van-row type="flex" justify="space-between">
                            <van-col  :style="{  padding: '0 16px',fontSize:'20px' }" span="12">入库：</van-col>
                            <van-col  :style="{  padding: '0 16px',fontSize:'20px' }" span="12">{{item.input?item.input:0}}{{item.product_unit}}</van-col>
                        </van-row>
                        <van-row type="flex" justify="space-between">
                            <van-col  :style="{  padding: '0 16px',fontSize:'20px' }" span="12">出库：</van-col>
                            <van-col  :style="{  padding: '0 16px',fontSize:'20px' }" span="12">{{item.output?item.output:0}}{{item.product_unit}}</van-col>
                        </van-row>
                        <van-row type="flex" justify="space-between">
                            <van-col  :style="{  padding: '0 16px',fontSize:'20px' }" span="12">库存：</van-col>
                            <van-col  :style="{  padding: '0 16px',fontSize:'20px' }" span="12">{{(item.input?item.input:0) -
                                (item.output?item.output:0)}}{{item.product_unit}}
                            </van-col>
                        </van-row>
                    </van-collapse-item>
                </van-collapse>
            </van-row>

            <van-popup v-model="selectSubjectShow" position="bottom">
                <van-picker
                        title="产品"
                        show-toolbar
                        :columns="productList"
                        @confirm="onConfirmSelectSubject"
                        @cancel="onCancelSelectSubject"
                />
            </van-popup>
        </van-col>
    </van-row>
</template>

<script>
    import Vue from 'vue';
    import {mapState} from 'vuex';
    import {Cell, CellGroup, Calendar, Field, Form, Collapse, CollapseItem, Divider, Toast} from 'vant';

    Vue.use(Field);
    Vue.use(Form);
    Vue.use(Collapse);
    Vue.use(CollapseItem);
    Vue.use(Divider);
    Vue.use(Toast);
    Vue.use(Calendar);
    Vue.use(Cell);
    Vue.use(CellGroup);

    import apis from '@/apis/apis';

    export default {
        name: "Statistics",
        data() {
            return {
                minDate: new Date(2019, 1, 1),
                maxDate: new Date(2050, 12, 31),
                summaryQueryData: {
                    product_id: 0,
                    product_name: '全部',
                    beginDate: '',
                    endDate: ''
                },
                beginDateShow: false,
                endDateShow: false,
                activeNames: [],
                sumStatisticsList: [],
                productList: [
                    {
                        id: 0,
                        text: '全部',
                        unit: '',
                    }
                ],
                selectSubjectShow: false,
            }
        },
        methods: {
            queryProductSelectList() {
                apis.product.productSelectList().then(res => {
                    this.productList = this.productList.concat(res.data.data);
                }).catch(err => {
                    Toast('网络错误')
                    console.log(err);
                })
            },
            formatDate(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            },
            checkRole() {
                if (this.user_role == 1) {
                    this.$router.replace({
                        path: '/input'
                    })
                }
            },
            onConfirmSelectSubject(value) {
                this.summaryQueryData.product_name = value.text;
                this.summaryQueryData.product_id = value.id;
                this.selectSubjectShow = false;
                this.query_statistics();
            },
            onCancelSelectSubject() {
                this.selectSubjectShow = false;
            },
            showSelect() {
                this.selectSubjectShow = true;
            },
            showBeginDate() {
                this.beginDateShow = true;
            },
            showEndDate() {
                this.endDateShow = true;
            },
            query_statistics() {
                apis.statistics.sumStatistics(this.summaryQueryData).then(res => {
                    this.sumStatisticsList = res.data.data;
                    for (let i in this.sumStatisticsList) {
                        Vue.set(this.activeNames, i, this.sumStatisticsList[i].product_name)
                    }
                }).catch(err => {
                    Toast.fail(err.response.data.msg)
                });
            },
            onConfirmBeginDate(date) {
                this.summaryQueryData.beginDate = this.formatDate(date);
                this.beginDateShow = false;
                this.query_statistics();
            },
            onConfirmEndDate(date) {
                this.summaryQueryData.endDate = this.formatDate(date);
                this.endDateShow = false;
                this.query_statistics();
            },
        },
        mounted() {
            let date = new Date();
            this.summaryQueryData.beginDate = this.formatDate(date);
            this.summaryQueryData.endDate = this.formatDate(date);
            this.checkRole();
            this.query_statistics();
            this.queryProductSelectList();
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
