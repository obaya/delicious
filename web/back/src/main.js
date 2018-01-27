import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'bootstrap/dist/css/bootstrap.css'
import 'element-ui/lib/theme-default/index.css'

//把axios挂载到Vue的原型上,其它子组件即可调用
import Axios from 'axios'
Vue.prototype.$http = Axios
import VueAxios from 'vue-axios'

//公共方法
import Common from './components/common/Common.vue';
Vue.use(Common);

import "../static/css/main.css"

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueAxios, Axios)

new Vue({
    el: '#app',
    router,
    // template: '<App/>',
    // components: { App },
    render:h=>h(App)
})
