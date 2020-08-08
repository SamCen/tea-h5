import axios from 'axios';

export default {
    /**
     * 登录
     * @param params
     * @returns {*}
     */
    login(params) {
        return axios.post('app/auth/login', params);
    },
    /**
     * 微信登录
     * @param params
     * @returns {Promise<AxiosResponse<T>>}
     */
    wxLogin(params) {
        return axios.post('app/auth/wechatLogin',params);
    },

    /**
     * 绑定用户
     * @param params
     * @returns {Promise<AxiosResponse<T>>}
     */
    bindUser(params){
        return axios.post('app/auth/bindUser',params);
    }
}
