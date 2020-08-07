import axios from 'axios';
import auth from '@/apis/modules/auth';
import user from '@/apis/modules/user';
import store from '@/store';

axios.defaults.baseURL = process.env.VUE_APP_URL;

axios.interceptors.request.use(config => {
    const access_token = store.state.access_token;
    if (access_token) {
        config.headers.Accept = 'application/json';
        config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default {
    auth,
    user,
}
