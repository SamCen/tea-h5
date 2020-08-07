<template>
    <van-tabs v-model="activeName" @change="onChangeTab">
        <van-tab title="入库" name="input">
            <van-row type="flex" justify="center">
                <van-col>
                    <van-form @submit="onSubmitSelectSubject">
                        <van-row>
                            <van-col>
                                <div class="field-login van-hairline--bottom">
                                    <van-field
                                            readonly
                                            clickable
                                            name="subject"
                                            :value="selectSubject.name"
                                            label="入库科目"
                                            :placeholder="this.pickerName"
                                            @click="showSelect"
                                    />
                                </div>
                            </van-col>
                        </van-row>
                        <van-row>
                            <van-col>
                                <div class="field-login van-hairline--bottom">
                                    <van-field v-model="selectSubject.num" label="入库数量" placeholder="请输入入库数量">
                                        <template #button>
                                            {{selectSubject.unit}}
                                        </template>
                                    </van-field>
                                </div>
                            </van-col>
                        </van-row>
                        <div style="margin: 40px;">
                            <van-button round block type="info" native-type="submit">
                                入库
                            </van-button>
                        </div>
                    </van-form>
                    <van-popup v-model="selectSubjectShow" position="bottom">
                        <van-picker
                                title="入库科目"
                                show-toolbar
                                :columns="subjects"
                                @confirm="onConfirmSelectSubject"
                                @cancel="onCancelSelectSubject"
                        />
                    </van-popup>
                </van-col>
            </van-row>
        </van-tab>
        <van-tab title="出库" name="output">
            <van-row type="flex" justify="center">
                <van-col>
                    <van-form @submit="onSubmitSelectSubject">
                        <van-row>
                            <van-col>
                                <div class="field-login van-hairline--bottom">
                                    <van-field
                                            readonly
                                            clickable
                                            name="subject"
                                            :value="selectSubject.name"
                                            label="出库科目"
                                            :placeholder="this.pickerName"
                                            @click="showSelect"
                                    />
                                </div>
                            </van-col>
                        </van-row>
                        <van-row>
                            <van-col>
                                <div class="field-login van-hairline--bottom">
                                    <van-field v-model="selectSubject.num" label="出库数量" placeholder="请输入入出库数量">
                                        <template #button>
                                            {{selectSubject.unit}}
                                        </template>
                                    </van-field>
                                </div>
                            </van-col>
                        </van-row>
                        <div style="margin: 40px;">
                            <van-button round block type="info" native-type="submit">
                                入库
                            </van-button>
                        </div>
                    </van-form>
                    <van-popup v-model="selectSubjectShow" position="bottom">
                        <van-picker
                                title="出库科目"
                                show-toolbar
                                :columns="subjects"
                                @confirm="onConfirmSelectSubject"
                                @cancel="onCancelSelectSubject"
                        />
                    </van-popup>
                </van-col>
            </van-row>
        </van-tab>
    </van-tabs>
</template>

<script>

    import Vue from 'vue';
    import {Tab, Tabs, Picker, Popup, Col, Row, Form, Button, Field, Toast} from 'vant';

    Vue.use(Button);
    Vue.use(Field);
    Vue.use(Form);
    Vue.use(Col);
    Vue.use(Row);
    Vue.use(Popup);
    Vue.use(Picker);
    Vue.use(Tab);
    Vue.use(Tabs);
    Vue.use(Toast);

    import apis from '@/apis/apis';

    export default {
        name: "Input",
        data() {
            return {
                selectSubject: {
                    'product_id': '',
                    'name': '',
                    'num': '',
                    'unit': '单位',
                    'action':'input'
                },
                pickerName: '请选择需要入库的科目',
                selectSubjectShow: false,
                selectSubjectUnit: '',

                activeName: 'input',
                subjects: [],
            };
        },
        methods: {
            queryProductSelectList() {
                apis.product.productSelectList().then(res => {
                    this.subjects = res.data.data;
                }).catch(err => {
                    Toast.fail('网络错误')
                    console.log(err);
                })
            },
            onConfirmSelectSubject(value) {
                this.selectSubject.name = value.text;
                this.selectSubject.product_id = value.id;
                this.selectSubject.unit = value.unit;
                this.selectSubjectShow = false;
            },
            onCancelSelectSubject() {
                this.selectSubjectShow = false;
            },
            showSelect() {
                this.selectSubjectShow = true;
            },
            onSubmitSelectSubject() {
                apis.product.operation(this.selectSubject).then(res=>{
                    Toast.success(res.data.msg);
                }).catch(err=>{
                    console.log(err)
                })
            },
            onChangeTab(name) {
                if (name === 'input') {
                    this.pickerName = '请选择需要入库的科目';
                } else if (name === 'output') {
                    this.pickerName = '请选择需要出库的科目';
                }
                this.selectSubject = {
                    'product_id': '',
                    'name': '',
                    'num': '',
                    'unit': '单位',
                    'action':name,
                }
                console.log(this.selectSubject)
            },
        },
        mounted() {
            this.queryProductSelectList();
        },
    }
</script>

<style scoped>
    .field-login {
        margin: 40px 20px 0 20px;
        /*border-bottom: darkgrey 1px solid;*/
    }
</style>
