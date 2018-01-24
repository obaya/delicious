import Vue from 'vue';
import VueRouter from 'vue-router';



import homeComponent from '../components/home/home.vue';// 首页
import footerComponent from '../components/footer/footer.vue';// 底部
import homeSearch from '../components/homeSearch/homeSearch.vue';// 搜索页面
import goodsDetail from '../components/goodsDetail/goodsDetail.vue';// 详情


import tocart from '../components/takeout/tocart.vue';//外卖购物车
import toorder from '../components/takeout/toorder.vue';
import eicart from '../components/eatin/eicart.vue';//堂食购物车
import eiorder from '../components/eatin/eiorder.vue';






import y_mineComponent from '../components/y_mine/y_mine.vue'
import y_orderComponent from '../components/y_myorder/y_myorder.vue'
import y_evaluateComponent from '../components/y_evaluate/y_evaluate.vue'
import y_starComponent from '../components/y_star/y_star.vue'
import y_addressComponent from '../components/y_address/y_address.vue'
import y_editAddressComponent from '../components/y_edit_address/y_edit_address.vue'

import zhou from '../components/classify/zhou.vue';
import snack from '../components/classify/snack.vue';
import Package from '../components/classify/Package.vue';
import noodle from '../components/classify/noodle.vue';
import juice from '../components/classify/juice.vue';
import greens from '../components/classify/greens.vue';

import classifyComponent from '../components/classify/classify.vue';

import comment from '../components/comment/comment.vue';




Vue.use(VueRouter);
var router = new VueRouter({
    mode: 'history',
    // 这里配置路由
    routes:[
        {

            path:'/classify',
            name:classify,
            component: classify,
            children:[
                { 
                    path:'/zhou',
                    name:'zhou',
                    component:zhou
                },{ 
                    path:'/snack',
                    name:'snack',
                    component:snack
                },{ 
                    path:'/Package',
                    name:'Package',
                    component:Package
                },{ 
                    path:'/noodle',
                    name:'noodle',
                    component:noodle
                },{ 
                    path:'/juice',
                    name:'juice',
                    component:juice
                },{ 
                    path:'/greens',
                    name:'greens',
                    component:greens
                },
            ]
            
        },
        {
            path:'/comment', 
            name:comment,
            component: comment
            // component:loginComponent
        },{

            path:'/',
            name:'home',
            component:homeComponent,

        },
         {
            path:'/homeSearch',
            name:'homeSearch',
            component:homeSearch,
       
        },
    
        {
            path:'/tocart',
            name:'tocart',
            component:tocart
        },
        {
            path:'/toorder',
            name:'toorder',
            component:toorder
        },

        {
            path:'/eicart',
            name:'eicart',
            component:eicart
        },
        {
            path:'/eiorder',
             name:'eiorder',
            component:eiorder
        },
        
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