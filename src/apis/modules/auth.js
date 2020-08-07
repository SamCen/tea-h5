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
}
