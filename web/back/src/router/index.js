import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/common/Home'
import welcome from '../components/page/welcome.vue'
import goodslist from '../components/page/goodslist.vue'
import user from '../components/page/user.vue'
import order from '../components/page/order.vue'
import addgoods from '../components/page/addgoods.vue'
import login from '../components/page/login.vue'
import updategoods from '../components/page/updategoods.vue'
import echarts from '../components/page/echarts.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '*',redirect:'/' },
    {path: '/login',component: login,name:'login'},
    {
        path: '/',component: Home,redirect: '/index',
        children: [
            { path: 'index',component: welcome,name:'index' },
            { path: 'goodslist',component: goodslist },
            { path: 'user', component: user },
            { path: 'order', component: order },
            { path: 'addgoods',component: addgoods,name:'addgoods'},
            { path: 'updategoods',component: updategoods,name:'updategoods'},
            { path: 'echarts', component: echarts }
        ]
    }
  ]
})
