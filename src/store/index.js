import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/apis/apis';

Vue.use(Vuex);

// let JSON = global.JSON;

export default new Vuex.Store({
    state: {
        access_token: sessionStorage.getItem('access_token'),
        user_role: sessionStorage.getItem('user_role'),
        loginFail: null,
    },
    mutations: {
        SET_TOKEN: (state, access_token = null) => {
            Vue.set(state, 'access_token', access_token);
            if (access_token) {
                sessionStorage.setItem('access_token', access_token);
            } else {
                sessionStorage.removeItem('access_token');
            }
        },
        SET_ROLE: (state, role = null) => {
            Vue.set(state, 'user_role', role);
            if (role) {
                sessionStorage.setItem('user_role', role);
            } else {
                sessionStorage.removeItem('user_role');
            }
        },
        SET_LOGIN_FAIL: (state, data = null) => {
            Vue.set(state, 'loginFail', data);
        },
    },
    actions: {
        login({commit}, params) {
            api.auth.login(params).then(response => {
              commit('SET_TOKEN', response.data.data.access_token);
              commit('SET_ROLE', response.data.data.role);
            }).catch(errors => {
                commit('SET_LOGIN_FAIL', errors.response.data.msg);
            });
        },
    },
})
