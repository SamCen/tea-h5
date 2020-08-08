import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/apis/apis';

Vue.use(Vuex);

// let JSON = global.JSON;

export default new Vuex.Store({
    state: {
        access_token: localStorage.getItem('access_token'),
        user_role: localStorage.getItem('user_role'),
        loginFail: null,
        code:localStorage.getItem('code'),
    },
    mutations: {
        SET_TOKEN: (state, access_token = null) => {
            Vue.set(state, 'access_token', access_token);
            if (access_token) {
                localStorage.setItem('access_token', access_token);
            } else {
                localStorage.removeItem('access_token');
            }
        },
        SET_CODE:(state , code = null) =>{
            Vue.set(state, 'code', code);
            if (code) {
                localStorage.setItem('code', code);
            } else {
                localStorage.removeItem('code');
            }
        },
        SET_ROLE: (state, role = null) => {
            Vue.set(state, 'user_role', role);
            if (role) {
                localStorage.setItem('user_role', role);
            } else {
                localStorage.removeItem('user_role');
            }
        },
        SET_LOGIN_FAIL: (state, data = null) => {
            Vue.set(state, 'loginFail', data);
        },
    },
    actions: {
        login({commit}, params) {
            api.auth.login(params).then(res => {
              commit('SET_TOKEN', res.data.data.access_token);
              commit('SET_ROLE', res.data.data.role);
              commit('SET_CODE',null);
            }).catch(err => {
                commit('SET_LOGIN_FAIL',err.response.data.msg);
            });
        },
        wxLogin({commit},params){
            api.auth.wxLogin(params).then(res=>{
                if(res.data.data.access_token != null){
                    commit('SET_TOKEN', res.data.data.access_token);
                    commit('SET_ROLE', res.data.data.role);
                }else{
                    commit('SET_CODE',res.data.data.code);
                }
            }).catch(err => {
                commit('SET_LOGIN_FAIL', err.response.data.msg);
            });
        },
        bindUser({commit},params){
            api.auth.bindUser(params).then(res=>{
                commit('SET_TOKEN', res.data.data.access_token);
                commit('SET_ROLE', res.data.data.role);
                commit('SET_CODE',null);
            }).catch(err=>{
                commit('SET_LOGIN_FAIL', err.response.data.msg);
            })
        }
    },
})
