import Vue from 'vue';
import VueRouter from 'vue-router';

// 这里引入各个组件
// import loginComponent from '../components/login/login.vue'
import tocart from '../components/takeout/tocart.vue';
import toorder from '../components/takeout/toorder.vue';
import eicart from '../components/eatin/eicart.vue';
import eiorder from '../components/eatin/eiorder.vue';
Vue.use(VueRouter);
var router = new VueRouter({
    mode: 'history',
    // 这里配置路由
    routes:[
        {
            path:'/',
            // component:loginComponent
            
        },
        {
            path:'/tocart',
            component:tocart
        },
        {
            path:'/toorder',
            component:toorder
        },
        {
            path:'/eicart',
            component:eicart
        },
        {
            path:'/eiorder',
            component:eiorder
        }
    ]
})
export default router;