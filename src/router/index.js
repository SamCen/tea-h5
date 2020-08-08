import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Input from '../views/Input.vue'
import Statistics from '../views/Statistics.vue'
import WechatLoading from '../views/WechatLoading.vue'
import BindUser from '../views/BindUser.vue'
import store from '@/store';
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/wechatLoading',
        name: 'wechatLoading',
        component: WechatLoading

    },
    {
        path: '/login',
        name: 'Login',

        component: Login,
    },
    {
        path: '/statistics',
        name: 'Statistics',
        beforeEnter: (to, from, next) => {
            /**
             * 验证用户是否登录
             */
            if (store.state.access_token) {
                next();
            } else {
                router.replace({
                    path: '/login',
                });
            }
        },
        component: Statistics
    },
    {
        path: '/input',
        name: 'Input',
        beforeEnter: (to, from, next) => {
            /**
             * 验证用户是否登录
             */
            if (store.state.access_token) {
                next();
            } else {
                router.replace({
                    path: '/login',
                });
            }
        },
        component: Input
    },
    {
        path: '/bindUser',
        name: 'BindUser',
        component: BindUser
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
