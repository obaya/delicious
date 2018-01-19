import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//引入公共样式表
import rem from './getRem/getRem.js'
import './basescss/base.scss'

rem.rem();

Vue.use(ElementUI)
import Router from './router/index'

new Vue({
  el: '#app',
  router:Router,
  render: h => h(App)
})