import Vue from 'vue';
import VueRouter from 'vue-router';

// 这里引入各个组件
// import loginComponent from '../components/login/login.vue'
import classify from '../components/classify/classify.vue';
import comment from '../components/comment/comment.vue';





Vue.use(VueRouter);
var router = new VueRouter({
    mode: 'history',
    // 这里配置路由
    routes:[
        {
            path:'/classify', component: classify
            // component:loginComponent
        },
        {
            path:'/comment', component: comment
            // component:loginComponent
        }
    ]
})
export default router;