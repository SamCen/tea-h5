import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});
Vue.config.productionTip = false;
import 'vant/lib/index.css'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
