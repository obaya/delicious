<template>
	<ul v-if = "'精选热菜' == status">
		<li v-for="(obj,index) in greens" :class="obj.title" :id="obj.id">
			<img :src="obj.imgUrl[1]" class="tuP"/>
			<h3 class="h3">{{obj.title}}</h3>
			<div class="sell"><div class="evaluate">月销售<span>{{obj.sales}}</span>份</div><div class="evaluate">好评率100%</div></div>
			<p id="price"><span>￥<span>{{obj.newPrice}}</span></span><del>￥{{obj.oldPrice}}</del></p>
			<div class="addRed">
				<div class="reduce" v-if="!(parseInt(obj.discount)<=1)" @click="reduce(obj)"><img src="../../assets/reduce.png"/></div>
				<div id="qty" v-if="!(parseInt(obj.discount)<=1)">{{obj.discount==1?0:obj.discount-1}}</div>
				<div class="add"  @click="add(obj)"><img src="../../assets/add.png"/></div>
			</div>
		</li>
	</ul>
</template>

<script>
	export default{
		data(){
			return{
				showList:false
				
			}
		},
		methods:{
			add:function(_obj){
				_obj.discount++
			},
			reduce:function(_obj){
				_obj.discount--
			}
		},
		props:['greens','status']
	}
</script>

<style>
</style>