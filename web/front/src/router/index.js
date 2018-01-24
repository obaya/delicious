import Vue from 'vue';
import VueRouter from 'vue-router';



import homeComponent from '../components/home/home.vue';// 首页
import footerComponent from '../components/footer/footer.vue';// 底部
import homeSearch from '../components/homeSearch/homeSearch.vue';// 搜索页面
import goodsDetail from '../components/goodsDetail/goodsDetail.vue';// 详情

import tocart from '../components/takeout/tocart.vue';
import toorder from '../components/takeout/toorder.vue';
import eicart from '../components/eatin/eicart.vue';
import eiorder from '../components/eatin/eiorder.vue';



import classify from '../components/classify/classify.vue';
import comment from '../components/comment/comment.vue';





import y_mineComponent from '../components/y_mine/y_mine.vue'
import y_orderComponent from '../components/y_myorder/y_myorder.vue'
import y_evaluateComponent from '../components/y_evaluate/y_evaluate.vue'
import y_starComponent from '../components/y_star/y_star.vue'
import y_addressComponent from '../components/y_address/y_address.vue'
import y_editAddressComponent from '../components/y_edit_address/y_edit_address.vue'





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
        },{

            path:'/',

            name:'home',
            component:homeComponent,
            children:[
                {
                    path: 'indexDetail',
                    name: 'indexDetail',
                    component: goodsDetail 
                },
            ]
        },
         {
            path:'/homeSearch',
            name:'homeSearch',
            component:homeSearch  
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
        },{

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
            component:y_evaluateComponent,
            children:[
                {
                    path:'/star',
                    name:'star',
                    component:y_starComponent
                },
            ]
        },{
            path:'/address',
            name:'address',
            component:y_addressComponent
        },{
            path:'/editaddress',
            name:'editaddress',
            component:y_editAddressComponent
        },

    ]
})
export default router;