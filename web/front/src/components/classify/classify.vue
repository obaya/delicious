<template>

	<div id="app">
		<img src="../../assets/head2.png" alt="" width="100%" height="165px" />
		<ul id="canteen">
			<li class="mess" v-text="classes"></li>
			<li style="color:#333;" @click="toComment">评论</li>
		</ul>
		<div id="mian">
			<div id="class">
				<ul>
					<li v-for="(item,index) in classifyList" @click="refresh(item)">
						<span>{{item}}</span>
					</li>
				</ul>
			</div>
			<div id="style">
				<div id="top">
					<div class="style1">{{this.showList}}</div>
					<div class="style2">
						<div class="cDatails">
							<!---->
							<Package :pack = 'Packages' :status = 'showList'></Package>
							<!---->
							<zhou :zhou="zhous" :zhouStatus = 'showList'></zhou>
							
							<!---->
							<greens :greens="greens" :status = 'showList'></greens>
							
							<!---->
							<cold :cold="cold" :status="showList"></cold>
							
							<!---->
							<snack :snack="snack" :status="showList"></snack>
							
							<!---->
							<juice :juice="juice" :status="showList"></juice>
							
							<!---->
							<noodle :Noodle="noodle" :status="showList"></noodle>
							
							<!---->
							<hot :Hot="hot" :status="showList"></hot>
							
							<!---->
					
						</div>
					</div>
				</div>

			</div>
		</div>
		<!--、、、、、、、、、、、、、、、、、、、底部、、、、、、、、、、、、、、、、-->
		<div id="foot">
			<div class="big" @click='changeCartKey()'><div class="min"><img src="../../assets/car.png" alt="" id="car"/></div></div>
			<div class="footQty">共<span class="footQ">{{$store.state.qty}}</span>份</div>
			<div class="total">价格：￥<span>{{$store.state.carTotal}}</span></div>
			<div class="OK" @click="addcart">选好了</div>
		</div>
		
		

		<!-- <div class="car" v-if='cartKey'>
			<div class="carlist">
				<div class="carlistT">
					<span class="carlistT1">购物车</span>
					<span class="carlistT2" @click="clear">清空</span>
				</div>
				<div class="carlistB">
					<ul>
						<li v-for="(item,idx) in $store.state.carAllGood.data" v-if="item.qty > 0">
							<span class="list">{{item.title}}</span>
							<span class="cPrice">￥{{$store.state.carTotal}}</span>
							<div class="count">
								<div class="reduce2"><img src="../../assets/reduce.png"/></div>
								<div id="qty2">{{item.qty}}</div>
								<div class="add2"><img src="../../assets/add.png" alt="" /></div>
							</div>
						</li>
						
					</ul>
				</div>
			</div>
		</div> -->
		

		<div class="car" v-if='cartKey'>
			<div class="carlist">
				<div class="carlistT">
					<span class="carlistT1">购物车</span>
					<span class="carlistT2" @click="clear">清空</span>
				</div>
				<div class="carlistB">
					<ul>
						<li v-for="(item,idx) in $store.state.carAllGood.data" v-if="item.qty > 0">
							<span class="list">{{item.title}}</span>
							<span class="cPrice">￥{{item.newPrice*item.qty}}</span>
							<div class="count">
								<div class="reduce2" @click="reduce(item,idx)"><img src="../../assets/reduce.png"/></div>
								<div id="qty2">{{item.qty}}</div>
								<div class="add2" @click="add(item,idx)"><img src="../../assets/add.png" alt="" /></div>
							</div>
						</li>
						
					</ul>
				</div>
			</div>
		</div>
     <goodsDetailmodel v-if="show" :gid="gid"  @increment="a"></goodsDetailmodel>
		
	 <footermodel color="classify"></footermodel>
	</div>
</template>

<script>
	import axios from 'axios';
	import baseUrl from '../../utils/baseurl.js';
	import classifyScss from './classify.vue';
	import basescss from '../../basescss/base.scss';
	import Package from './Package.vue';
	import zhou from './zhou.vue';
	import hot from './hot.vue'
	import noodle from './noodle.vue';
	import juice from './juice.vue'
	import snack from './snack.vue'
	import cold from './cold.vue'
	import greens from './greens.vue';
	import jquery from './jquery-3.2.1.js'
	import footermodel from '../../components/footer/footer.vue';
 	import goodsDetailmodel from '../../components/goodsDetail/goodsDetail.vue';
	
	
	export default{
		data(){
			return {
				dataset:[],
				Packages:[],
				zhous:[],
				greens:[],
				cold:[],
				snack:[],
				juice:[],
				hot:[],
				noodle:[],
				carList:[],
				classes:'',
				user_id:'',
				classifyList:["热销榜","单人特色套餐","特色粥品","精选热菜","爽口凉菜","小吃主食","果拼果汁","面类","甜品"],
				showList:"热销榜",
				cartKey:false,
				type:0,
				show:false,
			}
		},
		components:{Package,zhou,hot,noodle,juice,snack,cold,greens,footermodel,goodsDetailmodel},
		methods:{
			toComment(){
				this.$router.push('comment');
			},
			a(){
		         this.show=false;
		      },
		      search_goodsdetail: function(){
		   
		        this.show = true;
		      },
			refresh: function(_item){
				this.showList = _item;
				
			},
			addcart(){
				if(this.classes == '外卖'){
				  this.$router.push({name:'tocart'});
				}else{
				  this.$router.push({name:'eicart'});
				}
			},
			add:function(item,idx){
				var goodId = item.goods_id;
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

                	this.$store.state.carAllGood.data[idx].qty++;
                  	var price = item.newPrice;
	               	this.$store.commit('carTotal',price);
	               	this.$store.commit('initCar');	
               	})
				this.$store.commit('initCar');
			},
			reduce:function(item){
				var goodId = item.goods_id;
				var num = 0;
				var currentQty = 0;
				for(var i=0 ; i< this.$store.state.carAllGood.data.length ; i++){
					if(this.$store.state.carAllGood.data[i].goods_id ==  item.goods_id){
						this.$store.state.carAllGood.data[i].qty--;
						num = this.$store.state.carAllGood.data[i].id;
						currentQty = this.$store.state.carAllGood.data[i].qty;
					}
				}
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
			},
			clear(){
				this.$store.commit('clearCar')
			},
			changeCartKey(){
				this.cartKey = !this.cartKey;
				baseUrl.get({
                 	url:'/getUserCart',
                 	params:{
                    	user_id:this.user_id
                 	}
               	}).then(res=>{
               	});
			}
		},
		beforeMount(){
			


			baseUrl.get({
                    url:'/getClassifyGoods',

				}).then(response=>{
				this.dataset = response.data;
				this.dataset.forEach((item)=>{
					//单人精彩套餐、小吃主食、特色粥品、爽口凉菜、面类、精选热菜、果拼果汁、特色粥品
					if(item.classify == '单人精彩套餐'){
						this.Packages.push(item);
					}else if(item.classify == '特色粥品'){
						this.zhous.push(item);
					}else if(item.classify == '精选热菜'){
						this.greens.push(item);
					}else if(item.classify == '爽口凉菜'){
						this.cold.push(item)
					}else if(item.classify == '小吃主食'){
						this.snack.push(item)
					}else if(item.classify == '果拼果汁'){
						this.juice.push(item)
					}else if(item.classify == '面类'){
						this.noodle.push(item)
					}
				})
				for(var item  in this.dataset){
					if(this.dataset[item].sales>20){
						this.hot.push(this.dataset[item]);
					}
				}
			}).catch(function(error){
			})
			this.$store.commit('initCar')
		},
		mounted(){
			this.user_id = this.Cookie.getCookie('user_id');
			// this.$store.commit('user_id',this.user_id)
			this.$store.commit('a',this.user_id);
			var cookie = this.Cookie.getCookie('Take_out');

			 if(cookie === 'wai'){
			 	this.classes = '外卖';
			 	this.type = 1
			 }else{
			 	this.classes = '堂食';
			 	this.type = 0
			 }
			this.$store.commit('b',this.type);

			}
	}
</script>

<style>
	
	body,html{height:100%;}
	*{margin:0;padding:0;}
	#canteen{width:100%;height:1.09rem;display:flex;border-bottom:0.01rem solid #ccc;}
	#canteen li{flex:1;font-size:0.4rem;line-height:1.09rem;text-align: center;}
	#canteen .mess{color:#409EFF;}
	#mian{height:11.86rem;width:100%;display: flex;}
	#class{background:#F4F5F7;height:11.86rem;overflow-x: hidden;}
	#style{flex:6;background:#F4F5F7;}
	#class ul li{width:2.1rem;height:1.44rem;font-size:0.32rem;padding-right:2.53rem;box-sizing:border-box;}
	#class ul li span{display:inline-block;width:1.57rem;height:1.44rem;padding-top:0.48rem;margin-left:0.26rem;border-bottom:0.01rem solid #ccc;}
	#class .span{display:inline-block;line-height:0.53rem;margin-top:0.26rem;height:1.17rem;}
	#class .li{width:2.1rem;height:1.44rem;background:#fff;}
	.style1{height:0.69rem;line-height:0.69rem;font-size:0.32rem;border-left:0.05rem solid #DADDE2;margin-left:0.02rem;padding-left:0.13rem;background:#F4F5F7;}
	.style2{width:100%;height:11.2rem;background:#fff;overflow-x: hidden;}
	
	.cDatails li{padding-top:0.48rem;height:2.82rem;padding-left:0.46rem;padding-bottom:0.4rem;border-bottom: 0.01rem solid #ccc;}
	.cDatails .tuP{margin-right:0.24rem;display:inline-block;float: left;width:1.52rem;height:1.52rem;}
	.cDatails del{color:#bbb;font-size:0.26rem;margin-left:0.13rem;}

	.cDatails h3{font-size:0.37rem;float: left;width:4rem;}
	.cDatails .sell{float: left;font-size:0.29rem;display:inline-block;width:3.6rem;line-height:0.5rem;}
	.evaluate{display:inline-block;margin-right:0.09rem;}
	.cDatails #price{font-weight: bold;color:red;font-size:0.37rem;float:left;width:2rem;}
	/*.addRed{width:180px;height:30px;float}*/
	.cDatails .reduce{width:0.56rem;height:0.54rem;float: left;margin-left:1.06rem;}
	.cDatails .add{width:0.56rem;height:0.54rem;float:right;margin-right:0.25rem;}
	#qty{width:0.58rem;height:0.53rem;line-height:0.53rem;display:inline-block;font-size:0.24rem;float: left;text-align: center;}
	
	#foot{background:#141C27;height:1.28rem;position:relative;}
	#foot .big{width:1.46rem;height:1.46rem;background:#141C27;border-radius:50%;position:absolute;left:0.34rem;top:-0.26rem;}
	#foot .min{width:1.2rem;height:1.2rem;background:#2A333C;border-radius:50%;position:absolute;left:0.13rem;top:0.13rem;}
	#car{position:absolute;left:0.3rem;top:0.3rem;}
	#foot .footQty{font-size:0.4rem; color:#fff;line-height:1.28rem;margin-left:2.4rem;float: left;}
	#foot .footQ{margin:0 0.13rem;}
	#foot .total{font-size:0.4rem; color:#fff;line-height:1.28rem;margin-left:0.4rem;float: left;}
	#foot .OK{width:2.8rem;height:1.28rem;color:#fff;background:#f60;line-height:1.28rem;text-align: center;float: right;font-size:0.4rem;}
	.car{width:100%;height:16rem;background-color:rgba(0,0,0,0.2);position:relative;left:0;top:-17.77rem;}
	.car .carlist{width:100%;height:7.33rem;background:#FFF;position:absolute;left:0;bottom:-0.21rem;}
	.car .carlist .carlistT{width:100%;height:1.06rem;background: #F4F5F7;font-size:0.37rem;color:#000;line-height: 1.06rem;}
	.car .carlist .carlistT .carlistT2{float: right;margin-right:0.93rem;color:skyblue;}
	.car .carlist .carlistT .carlistT1{margin-left:0.93rem;}
	.car .carlist .carlistB{height:5.33rem;width:100%;overflow-x:hidden ;}
	.car .carlist .carlistB li{height:1.3rem;width:100%;font-size:0.4rem;color:#000;line-height:1.3rem;}
	.car .carlist .carlistB .cPrice{color:red;}
	.car .carlist .carlistB .count{width:2.13rem;display:inline-block;float: right;margin-top:0.13rem;margin-top:0.4rem;}
	.car .carlist .carlistB .list{display:inline-block;width:5.6rem;margin-left:0.48rem;}
	.car .carlist .carlistB .reduce2{display:inline-block;float: left;}
	.car .carlist .carlistB .add2{display:inline-block;float: left;}
	.car .carlist .carlistB #qty2{width:0.58rem;height:0.53rem;line-height:0.53rem;display:inline-block;font-size:0.24rem;float: left;text-align: center;}
	
	
	
	
	
</style>