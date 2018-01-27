
import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//引入公共样式表
import rem from './getRem/getRem.js'
import './basescss/base.scss'
import Cookie from './components/cookie/cookie.vue';
Vue.use(Cookie);


rem.rem();

Vue.use(ElementUI)
import Router from './router/index'

new Vue({
  el: '#app',
  router:Router,
  store,
  render: h => h(App)
})
