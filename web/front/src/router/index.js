import Vue from 'vue';
import VueRouter from 'vue-router';

// 这里引入各个组件


import homeComponent from '../components/home/home.vue';// 首页
import footerComponent from '../components/footer/footer.vue';// 底部
import homeSearch from '../components/homeSearch/homeSearch.vue';// 搜索页面
import goodsDetail from '../components/goodsDetail/goodsDetail.vue';// 详情

Vue.use(VueRouter);
var router = new VueRouter({
    mode: 'history',
    // 这里配置路由
    routes:[
        {
            path:'/',
            name:'home',
            component:homeComponent
        },
         {
            path:'/homeSearch',
            name:'homeSearch',
            component:homeSearch
        },
        {
            path:'/goodsDetail',
            name:'goodsDetail',
            component:goodsDetail
        }

    ]
})
export default router;