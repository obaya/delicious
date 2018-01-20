import Vue from 'vue';
import VueRouter from 'vue-router';

// 这里引入各个组件
// import loginComponent from '../components/login/login.vue'
import y_mineComponent from '../components/y_mine/y_mine.vue'
import y_orderComponent from '../components/y_myorder/y_myorder.vue'
import y_evaluateComponent from '../components/y_evaluate/y_evaluate.vue'

Vue.use(VueRouter);
var router = new VueRouter({
    mode: 'history',
    // 这里配置路由
    routes:[
        {
            path:'/mine',
            name:'mine',
            component:y_mineComponent
        },{
            path:'/yorder',
            name:'yorder',
            component:y_orderComponent
        },{
            path:'/evaluate',
            name:'evaluate',
            component:y_evaluateComponent
        },
    ]
})
export default router;