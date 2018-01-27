import Vue from 'vue'
import Vuex from 'vuex'

// 引入需要用到vuex的文件
import y_myorder from '../components/y_myorder/y_myorder.js'
import baseUrl from '../utils/baseurl.js'
Vue.use(Vuex)


const state = {
	carTotal:0,
	qty:0,
	carAllGood:{},
    user_id:0,
    type:''
}

const mutations = {
	carTotal(add,price){
		state.carTotal += price;
		state.qty++;
	},
	jianTotal(reduce,price){
		state.carTotal -= price;
		state.qty--
	},
    a(state,c){
        state.user_id=c;
    },
    b(state,c){
        state.type=c;
    },
	initCar(car){
		var total = 0;
		var goodQty = 0;
		baseUrl.get({
	     	url:'/getUserCart',
	     	params:{
	        	user_id:this.state.user_id,
                type:this.state.type,
	     	}
	 }).then(res=>{
         if(res.data.length > 0){

	      	res.data.forEach(function(item){

	      		total += (item.qty) * 1 * (item.newPrice) * 1;
	      		goodQty += item.qty;
	      	})
	      	state.carAllGood = JSON.parse(JSON.stringify(res));
	   		state.carTotal = total;	
	   		state.qty = goodQty;
        }
	   	})
	},
		clearCar(){
			state.carAllGood = {},
			state.carTotal = 0,
			state.qty = 0
			baseUrl.get({
             	url:'/clearUserCart',
             	params:{
             		user_id:this.state.user_id,
             		type:this.state.type,
             	}
            }).then(res=>{
           	})
		}
		
		
}



const store = new Vuex.Store({
    modules: {
        y_myorder,
    },
    state,
    mutations
})





export default store

