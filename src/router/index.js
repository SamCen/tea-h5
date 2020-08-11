import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Input from '../views/Input.vue'
import Statistics from '../views/Statistics.vue'
import WechatLoading from '../views/WechatLoading.vue'
import BindUser from '../views/BindUser.vue'
import store from '@/store';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/login',
        meta:{index:1,title: '天象科技'},
    },
    {
        path: '/wechatLoading',
        name: 'wechatLoading',
        component: WechatLoading,
        meta:{index:1,title: '微信授权登录'},

    },
    {
        path: '/login',
        name: 'Login',
        meta:{index:1,title: '用户登录'},
        component: Login,
    },
    {
        path: '/statistics',
        name: 'Statistics',
        meta:{index:1,title: '茶场库存统计'},
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
        meta:{index:1,title: '数据录入'},
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
        component: BindUser,
        meta:{index:1,title: '绑定用户'},
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
