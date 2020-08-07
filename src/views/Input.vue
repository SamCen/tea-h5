<template>
    <van-tabs v-model="activeName" @change="onChangeTab">
        <van-tab title="入库" name="input">
            <van-row type="flex" justify="center">
                <van-col>
                    <van-form @submit="onSubmitSelectSubject">
                        <van-row>
                            <van-col>
                                <van-field
                                        readonly
                                        clickable
                                        name="subject"
                                        :value="selectSubject.name"
                                        label="入库科目"
                                        :placeholder="this.pickerName"
                                        @click="showSelect"
                                />
                            </van-col>
                        </van-row>
                        <van-row>
                            <van-col>
                                <van-field v-model="selectSubject.num" label="入库数量" placeholder="请输入入库数量">
                                    <template #button>
                                        {{selectSubject.unit}}
                                    </template>
                                </van-field>
                            </van-col>
                        </van-row>
                        <div style="margin: 16px;">
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
                                <van-field
                                        readonly
                                        clickable
                                        name="subject"
                                        :value="selectSubject.name"
                                        label="出库科目"
                                        :placeholder="this.pickerName"
                                        @click="showSelect"
                                />
                            </van-col>
                        </van-row>
                        <van-row>
                            <van-col>
                                <van-field v-model="selectSubject.num" label="出库数量" placeholder="请输入入出库数量">
                                    <template #button>
                                        {{selectSubject.unit}}
                                    </template>
                                </van-field>
                            </van-col>
                        </van-row>
                        <div style="margin: 16px;">
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
    import {Tab, Tabs, Picker, Popup, Col, Row, Form, Button, Field} from 'vant';

    Vue.use(Button);
    Vue.use(Field);
    Vue.use(Form);
    Vue.use(Col);
    Vue.use(Row);
    Vue.use(Popup);
    Vue.use(Picker);
    Vue.use(Tab);
    Vue.use(Tabs);
    export default {
        name: "Input",
        data() {
            return {
                selectSubject: {
                    'id': 0,
                    'num': 0,
                    'unit': '单位',
                },
                pickerName: '请选择需要入库的科目',
                selectSubjectShow: false,
                selectSubjectUnit: '',

                activeName: 'input',
                subjects: [
                    {'id': 1, 'text': '2012春茶半成品', 'unit': '斤'},
                    {'id': 2, 'text': '2012夏茶罐装', 'unit': '罐'}
                ],
            };
        },
        methods: {
            onConfirmSelectSubject(value) {
                this.selectSubject.name = value.text;
                this.selectSubject.id = value.id;
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

            },
            onChangeTab(name) {
                if (name === 'input') {
                    this.pickerName = '请选择需要入库的科目';
                } else if (name === 'output') {
                    this.pickerName = '请选择需要出库的科目';
                }
                this.selectSubject = {
                    'id': 0,
                    'num': 0,
                    'unit': '单位'
                }
            },
        },
    }
</script>

<style scoped>

</style>
