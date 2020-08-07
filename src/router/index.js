import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Input from '../views/Input.vue'
import Statistics from '../views/Statistics.vue'
import WechatLoading from '../views/WechatLoading.vue'

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
        component: Login
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: Statistics
    },
    {
        path: '/input',
        name: 'Input',
        component: Input
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
