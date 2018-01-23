<template>

	<div id="app">
		<img src="../../assets/head.png"/>
		<ul id="canteen">
			<li class="mess">食堂</li>
			<li>评论</li>
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
							<ul v-if = "showList == '单人特色套餐'">
								<li v-for="(obj,index) in Package" :class="obj.title" >
									<div class="tuPian"><img :src="obj.imgUrl[0]" class="tuP"/></div>
									<h3 class="h3">{{obj.title}}</h3>
									<div class="sell"><div class="evaluate">月销售<span>{{obj.sales}}</span>份</div><div class="evaluate">好评率100%</div></div>
									<p id="price"><span>￥<span>{{obj.newPrice}}</span></span><del>￥{{obj.oldPrice}}</del></p>
									<div class="addRed">
										<div class="reduce"><img src="../../assets/reduce.png"/></div>
										<div id="qty">1</div>
										<div class="add"><img src="../../assets/add.png"/></div>
									</div>
								</li>
							</ul>
							<!---->
							<ul v-if = "showList == '特色粥品'">
								<li v-for="(obj,index) in zhou" :class="obj.title" >
									<img :src="obj.imgUrl[0]" class="tuP"/>
									<h3 class="h3">{{obj.title}}</h3>
									<div class="sell"><div class="evaluate">月销售<span>{{obj.sales}}</span>份</div><div class="evaluate">好评率100%</div></div>
									<p id="price"><span>￥<span>{{obj.newPrice}}</span></span><del>￥{{obj.oldPrice}}</del></p>
									<div class="addRed">
										<div class="reduce"><img src="../../assets/reduce.png"/></div>
										<div id="qty">1</div>
										<div class="add"><img src="../../assets/add.png"/></div>
									</div>
								</li>
							</ul>
							<ul v-if = "showList == '精选热菜'">
								<li v-for="(obj,index) in greens" :class="obj.title" >
									<img :src="obj.imgUrl[1]" class="tuP"/>
									<h3 class="h3">{{obj.title}}</h3>
									<div class="sell"><div class="evaluate">月销售<span>{{obj.sales}}</span>份</div><div class="evaluate">好评率100%</div></div>
									<p id="price"><span>￥<span>{{obj.newPrice}}</span></span><del>￥{{obj.oldPrice}}</del></p>
									<div class="addRed">
										<div class="reduce"><img src="../../assets/reduce.png"/></div>
										<div id="qty">1</div>
										<div class="add"><img src="../../assets/add.png"/></div>
									</div>
								</li>
							</ul>
							<ul v-if = "showList == '爽口凉菜'">
								<li v-for="(obj,index) in cold" :class="obj.title" >
									<img :src="obj.imgUrl[1]" class="tuP"/>
									<h3 class="h3">{{obj.title}}</h3>
									<div class="sell"><div class="evaluate">月销售<span>{{obj.sales}}</span>份</div><div class="evaluate">好评率100%</div></div>
									<p id="price"><span>￥<span>{{obj.newPrice}}</span></span><del>￥{{obj.oldPrice}}</del></p>
									<div class="addRed">
										<div class="reduce"><img src="../../assets/reduce.png"/></div>
										<div id="qty">1</div>
										<div class="add"><img src="../../assets/add.png"/></div>
									</div>
								</li>
							</ul>						
							<ul v-if = "showList == '小吃主食'">
								<li v-for="(obj,index) in snack" :class="obj.title" >
									<img :src="obj.imgUrl[1]" class="tuP"/>
									<h3 class="h3">{{obj.title}}</h3>
									<div class="sell"><div class="evaluate">月销售<span>{{obj.sales}}</span>份</div><div class="evaluate">好评率100%</div></div>
									<p id="price"><span>￥<span>{{obj.newPrice}}</span></span><del>￥{{obj.oldPrice}}</del></p>
									<div class="addRed">
										<div class="reduce"><img src="../../assets/reduce.png"/></div>
										<div id="qty">1</div>
										<div class="add"><img src="../../assets/add.png"/></div>
									</div>
								</li>
							</ul>	
							<ul v-if = "showList == '果拼果汁'">
								<li v-for="(obj,index) in juice" :class="obj.title" >
									<img :src="obj.imgUrl[1]" class="tuP"/>
									<h3 class="h3">{{obj.title}}</h3>
									<div class="sell"><div class="evaluate">月销售<span>{{obj.sales}}</span>份</div><div class="evaluate">好评率100%</div></div>
									<p id="price"><span>￥<span>{{obj.newPrice}}</span></span><del>￥{{obj.oldPrice}}</del></p>
									<div class="addRed">
										<div class="reduce"><img src="../../assets/reduce.png"/></div>
										<div id="qty">1</div>
										<div class="add"><img src="../../assets/add.png"/></div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>

			</div>
		</div>
		<div id="foot">
			<div class="big"><div class="min"><img src="../../assets/car.png" alt="" id="car"/></div></div>
			<div class="footQty">共<span class="footQ">1</span>份</div>
			<div class="total">价格：￥<span>10</span></div>
			<div class="OK">选好了</div>
			
		</div>
		
		
		
	</div>
	
</template>

<script>
	import axios from 'axios';
	import baseUrl from '../../utils/baseurl.js';
	import classifyScss from './classify.vue';
	import basescss from '../../basescss/base.scss';
	
	export default{
		data(){
			return {
				dataset:[],
				Package:[],
				zhou:[],
				greens:[],
				cold:[],
				snack:[],
				juice:[],
				qty:[],
				classifyList:["热销榜","单人特色套餐","特色粥品","精选热菜","爽口凉菜","小吃主食","果拼果汁","面类","甜品"],
				showList:"单人特色套餐"
			}
		},
		methods:{
			refresh: function(_item){
				console.log(_item);
				this.showList = _item;
			}
		},
		beforeMount(){
			axios.get('http://10.3.136.27:88/getClassifyGoods').then(response => {
				this.dataset = response.data;
				this.dataset.forEach((item)=>{
//					console.log(item.classify);
					//单人精彩套餐、小吃主食、特色粥品、爽口凉菜、面类、精选热菜、果拼果汁、特色粥品
					if(item.classify == '单人精彩套餐'){
						this.Package.push(item);
					}else if(item.classify == '特色粥品'){
						this.zhou.push(item);
					}else if(item.classify == '精选热菜'){
						this.greens.push(item);
					}else if(item.classify == '爽口凉菜'){
						this.cold.push(item)
					}else if(item.classify == '小吃主食'){
						this.snack.push(item)
					}else if(item.classify == '果拼果汁'){
						this.juice.push(item)
					}console.log(item.sales)
//					else if(item.sales > 20){
//						this.qty.push(item);
//						
//					}
						
					
					
				})
				console.log(this.dataset.sales);
			}).catch(function(error){
					console.log(error);
			})
		}
	}
</script>

<style>
	
	body,html{height:100px;}
	*{margin:0;padding:0;}
	#canteen{height:82px;display:flex;border-bottom:1px solid #ccc;}
	#canteen li{flex:1;font-size:30px;line-height:82px;text-align: center;}
	#canteen .mess{color:red;}
	#mian{height:890px;width:100%;display: flex;}
	#class{background:#F4F5F7;height:890px;overflow-x: hidden;}
	#style{flex:6;background:#F4F5F7;}
	#class ul li{width:158px;height:108px;font-size:24px;padding-right:190px;box-sizing:border-box;}
	#class ul li span{display:inline-block;width:118px;height:108px;padding-top:36px;margin-left:20px;border-bottom:1px solid #ccc;}
	#class .span{display:inline-block;line-height:40px;margin-top:20px;height:88px;}
	#class .li{width:158px;height:108px;background:#fff;}
	.style1{height:52px;line-height:52px;font-size:24px;border-left:4px solid #DADDE2;margin-left:2px;padding-left:10px;background:#F4F5F7;}
	.style2{width:558px;height:840px;background:#fff;overflow-x: hidden;}
	
	.cDatails li{padding-top:36px;height:212px;padding-left:35px;padding-bottom:30px;border-bottom: 1px solid #ccc;}
	.cDatails .tuP{margin-right:18px;display:inline-block;float: left;width:114px;height:114px;}
	.cDatails del{color:#bbb;font-size:20px;margin-left:10px;}

	.cDatails h3{font-size:30px;float: left;width:270px;}
	.cDatails .sell{float: left;font-size:22px;display:inline-block;width:270px;line-height:38px;}
	.evaluate{display:inline-block;margin-right:7px;}
	.cDatails #price{font-weight: bold;color:red;font-size:28px;float:left;width:150px;}
	.cDatails .reduce{width:42px;height:41px;float: left;margin-left:90px;}
	.cDatails .add{width:42px;height:41px;float: left;}
	#qty{width:44px;height:40px;line-height:40px;display:inline-block;font-size:18px;float: left;text-align: center;}
	
	#foot{background:#141C27;height:96px;position:relative;}
	#foot .big{width:110px;height:110px;background:pink;border-radius:50%;position:absolute;left:26px;top:-20px;}
	#foot .min{width:90px;height:90px;background:#2A333C;border-radius:50%;position:absolute;left:10px;top:10px;}
	#car{position:absolute;left:23px;top:23px;}
	#foot .footQty{font-size:30px; color:#fff;line-height:96px;margin-left:180px;float: left;}
	#foot .footQ{margin:0 10px;}
	#foot .total{font-size:30px; color:#fff;line-height:96px;margin-left:50px;float: left;}
	#foot .OK{width:210px;height:96px;color:#fff;background:#f60;line-height:96px;text-align: center;float: right;font-size:30px;}
	
</style>