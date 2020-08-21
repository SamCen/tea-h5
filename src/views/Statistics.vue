<template>
    <van-row>
        <van-col span="24">
            <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px',fontSize:'20px'  }"
            >产品出入库明细
            </van-divider>
            <van-row>
                <van-col offset="3" span="18">
                    <van-cell title="查询产品：" :style="{  padding: '0 16px',fontSize:'18px' }"
                              :value="summaryQueryData.product_name" is-link arrow-direction="down"
                              @click="showSelect"/>
                </van-col>
            </van-row>
            <br>
            <van-row>
                <van-col offset="3" span="18">
                    <van-cell title="开始日期：" :style="{  padding: '0 16px',fontSize:'18px' }" is-link
                              arrow-direction="down" :value="summaryQueryData.beginDate" @click="showBeginDate"/>
                    <van-calendar :min-date="minDate" :max-date="maxDate" v-model="beginDateShow" :show-confirm="false"
                                  @confirm="onConfirmBeginDate"/>
                </van-col>
            </van-row>
            <br>
            <van-row>
                <van-col offset="3" span="18">
                    <van-cell title="结束日期：" :style="{  padding: '0 16px',fontSize:'18px' }" is-link
                              arrow-direction="down" :value="summaryQueryData.endDate" @click="showEndDate"/>
                    <van-calendar :min-date="minDate" :max-date="maxDate" v-model="endDateShow" :show-confirm="false"
                                  @confirm="onConfirmEndDate"/>
                </van-col>
            </van-row>
            <van-divider content-position="left"
                         :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
            >
            </van-divider>
            <van-row>
                <van-collapse v-model="productActiveNames">
                    <van-collapse-item color="#1989fa" background="#ecf9ff" :key="index" :name=item.product_name
                                       v-for="(item,index) in sumStatisticsList.productList">
                        <template #title>
                            <div :style="{ padding: '0 16px',fontSize:'20px'}">{{item.product_name}}</div>
                        </template>
                        <van-row type="flex" justify="space-between">
                            <van-col :style="{  padding: '0 16px',fontSize:'20px' ,color:'#1989fa'}" span="12">
                                入库
                            </van-col>
                            <van-col :style="{  padding: '0 16px',fontSize:'20px' ,color:'#1989fa'}" span="12">
                                {{item.input}}{{item.product_unit}}
                            </van-col>
                        </van-row>
                        <van-row type="flex" justify="space-between">
                            <van-col :style="{  padding: '0 16px',fontSize:'20px',color:'#ee0a24' }" span="12">
                                出库
                            </van-col>
                            <van-col :style="{  padding: '0 16px',fontSize:'20px' ,color:'#ee0a24'}" span="12">
                                {{item.output}}{{item.product_unit}}
                            </van-col>
                        </van-row>
                        <van-row type="flex" justify="space-between">
                            <van-col :style="{  padding: '0 16px',fontSize:'20px' ,color:'#07c160'}" span="12">
                                库存
                            </van-col>
                            <van-col :style="{  padding: '0 16px',fontSize:'20px' ,color:'#07c160'}" span="12">
                                {{item.storage}}{{item.product_unit}}
                            </van-col>
                        </van-row>
                        <van-divider
                                :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
                        >
                        </van-divider>
                    </van-collapse-item>

                </van-collapse>
            </van-row>

            <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px',fontSize:'20px'  }"
            >库存汇总
            </van-divider>
            <van-row v-for="item in categorySumList" :key="item.id">
                <van-col :style="{  padding: '0 16px',fontSize:'20px',margin:'16px 0'}" span="12">
                    {{item.category_name}}
                </van-col>
                <van-col :style="{  padding: '0 16px',fontSize:'20px',margin:'16px 0'}" span="12">
                    {{item.storage}}{{item.product_unit}}
                </van-col>
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
    import {
        Tab,
        Tabs,
        Cell,
        Button,
        CellGroup,
        Calendar,
        Field,
        Form,
        Collapse,
        CollapseItem,
        Divider,
        Toast
    } from 'vant';

    Vue.use(Field);
    Vue.use(Form);
    Vue.use(Collapse);
    Vue.use(CollapseItem);
    Vue.use(Divider);
    Vue.use(Toast);
    Vue.use(Calendar);
    Vue.use(Cell);
    Vue.use(CellGroup);
    Vue.use(Button);
    Vue.use(Tab);
    Vue.use(Tabs);
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
                listTab: 'product',
                beginDateShow: false,
                endDateShow: false,
                productActiveNames: [],
                sumStatisticsList: {
                    productList: [],
                },
                categorySumList: [],
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
            userInfo(){
                apis.user.userInfo().then(res=>{
                    let data = res.data.data;
                    if(data.role == 1){
                        this.$router.replace({
                            path: '/input'
                        })
                    }
                }).catch(err=>{
                    if(err.response.status == 401){
                        this.$router.replace({
                            path: '/login'
                        })
                    }
                })
            },
            onConfirmSelectSubject(value) {
                this.summaryQueryData.product_name = value.text;
                this.summaryQueryData.product_id = value.id;
                this.selectSubjectShow = false;
                this.queryStatistics();
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
            queryStatistics() {
                apis.statistics.sumStatistics(this.summaryQueryData).then(res => {
                    this.sumStatisticsList = res.data.data;
                    for (let i in this.sumStatisticsList.productList) {
                        Vue.set(this.productActiveNames, i, this.sumStatisticsList.productList[i].product_name)
                    }
                }).catch(err => {
                    Toast.fail(err.response.data.msg)
                });
            },
            queryCategorySum() {
                apis.statistics.categorySum().then(res => {
                    this.categorySumList = res.data.data;
                }).catch(err => {
                    Toast.fail(err.response.data.msg)
                });
            },
            onConfirmBeginDate(date) {
                this.summaryQueryData.beginDate = this.formatDate(date);
                this.beginDateShow = false;
                this.queryStatistics();
            },
            onConfirmEndDate(date) {
                this.summaryQueryData.endDate = this.formatDate(date);
                this.endDateShow = false;
                this.queryStatistics();
            },
        },
        beforeCreate(){
            this.userInfo();
        },
        mounted() {
            let date = new Date();
            this.summaryQueryData.beginDate = this.formatDate(date);
            this.summaryQueryData.endDate = this.formatDate(date);
            this.queryStatistics();
            this.queryProductSelectList();
            this.queryCategorySum();
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
