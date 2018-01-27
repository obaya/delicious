<template>
	<ul v-if = "'特色粥品' == zhouStatus">
		<li v-for="(obj,index) in zhou" :class="obj.title" >
			<img :src="obj.imgUrl[0]" class="tuP"/>
			<h3 class="h3">{{obj.title}}</h3>
			<div class="sell"><div class="evaluate">月销售<span>{{obj.sales}}</span>份</div><div class="evaluate">好评率100%</div></div>
			<p id="price"><span>￥<span>{{obj.newPrice}}</span></span><del>￥{{obj.oldPrice}}</del></p>
			<div class="addRed" >
				<div class="reduce"  @click="reduce(obj)" v-for="(item,idx) in $store.state.carAllGood.data" v-if="(obj.id == item.goods_id) && (item.qty>=1)"><img src="../../assets/reduce.png"/></div>
				<div id="qty" v-for="(item,idx) in $store.state.carAllGood.data" v-if="(obj.id == item.goods_id) && (item.qty>=1)">{{item.qty}}</div>
				<div class="add"  @click="add(obj)"><img src="../../assets/add.png"/></div>
			</div>
		</li>
	</ul>
</template>

<script>
	
	import baseUrl from '../../utils/baseurl.js';
	
	export default{
		data(){
			return{
				showList:false
			}
		},
		methods:{
			add:function(_obj){
				var goodId = _obj.id;
				this.reduceState = true;
				baseUrl.get({
                 	url:'/insertCart',
                 	params:{
                 		goods_id:goodId,
                    	user_id:this.$store.state.user_id,

                        qty:1,
                        type:this.$store.state.type,
                 	}
                }).then(res=>{
                  	var price = _obj.newPrice;
	               	this.$store.commit('carTotal',price);
	               	this.$store.commit('initCar');
               	})
				this.$store.commit('initCar');
			},
			reduce:function(_obj){
				var goodId = _obj.id;
				var num = 0;
				var currentQty = 0;
				for(var i=0 ; i< this.$store.state.carAllGood.data.length ; i++){
					if(this.$store.state.carAllGood.data[i].goods_id == _obj.id){
						this.$store.state.carAllGood.data[i].qty--;
						num = this.$store.state.carAllGood.data[i].id;
						currentQty = this.$store.state.carAllGood.data[i].qty;
					}
				}
				// baseUrl.get({
    //              	url:'/updateCartQty',
    //              	params:{
    //              		id:num,
    //              		goods_id:goodId,
    //                     user_id:this.$store.state.user_id,
    //                 	qty:currentQty
    //              	}
    //             }).then(res=>{
    //               	console.log(res);
    //               	var price = _obj.newPrice;
	   //             	this.$store.commit('jianTotal',price);
	   //             	this.$store.commit('initCar');
    //            	})
                if(currentQty>0){
                    baseUrl.get({
                    url:'/updateCartQty',
                    params:{
                        id:num,
                        goods_id:goodId,
                        user_id:this.$store.state.user_id,
                        qty:currentQty
                    }
                }).then(res=>{
                    var price = _obj.newPrice;
                    this.$store.commit('jianTotal',price);
                    this.$store.commit('initCar');
                })
            }else{
                baseUrl.get({
                    url:'/deleteUserCartGoods',
                    params:{
       
                        goods_id:goodId,
                        user_id:this.$store.state.user_id,

               
                    }
                }).then(res=>{
                    var price = item.newPrice;
                    this.$store.commit('jianTotal',price);
                    this.$store.commit('initCar');
                })
            }
                
				this.$store.commit('initCar');
			}
		},
		props:['zhou','zhouStatus']
	}
</script>

<style>
</style>