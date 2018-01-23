<template>
	<div id="app">
		<img src="../../assets/head.png" alt="" />
		<ul id="canteen">
			<el-tabs v-model="activeName" @tab-click="handleClick" id="canteen1">
			    <el-tab-pane label="食堂" name="first"></el-tab-pane>
			    <el-tab-pane label="评论" name="second"></el-tab-pane>
			</el-tabs>
		</ul>
		<div id="commentT">
			<div class="commentTT">
				<div class="all">全部</div>
				<div class="Ok">满意</div>
				<div class="No">不满意</div>
			</div>
			<div class="Ct">
				<i class="el-icon-circle-check"></i>
				<span>只看又内容的评论</span>
			</div>
		</div>
		<div id="commentB">
			<div class="ctb1">
				<div id="headP"><img src="../../assets/headP.png" alt="" /></div>
				<div class="NameT"><span>一起吃鸡</span><span class="time">2017-01-20 12:00</span></div>
				<div class="block">
					<el-rate v-model="value1" class="star"></el-rate>
				</div>
				<div class="main">很好吃，吃得我不想吃了，太棒了，我天天吃这个。</div>
				
			</div>
			<div class="ctb1">
				<div id="headP"><img src="../../assets/headP.png" alt="" /></div>
				<div class="NameT"><span>一起吃鸡</span><span class="time">2017-01-20 12:00</span></div>
				<div class="block">
					<el-rate v-model="value1" class="star"></el-rate>
				</div>
				<div class="main">很好吃，吃得我不想吃了，太棒了，我天天吃这个。</div>
			</div>
			<div class="ctb1">
				<div id="headP"><img src="../../assets/headP.png" alt="" /></div>
				<div class="NameT"><span>一起吃鸡</span><span class="time">2017-01-20 12:00</span></div>
				<div class="block">
					<el-rate v-model="value1" class="star"></el-rate>
				</div>
				<div class="main">很好吃，吃得我不想吃了，太棒了，我天天吃这个。</div>
				
			</div>
			<div class="ctb1">
				<div id="headP"><img src="../../assets/headP.png" alt="" /></div>
				<div class="NameT"><span>一起吃鸡</span><span class="time">2017-01-20 12:00</span></div>
				<div class="block">
					<el-rate v-model="value1" class="star"></el-rate>
				</div>
				<div class="main">很好吃，吃得我不想吃了，太棒了，我天天吃这个。</div>
				
			</div>
		</div>
		
		
	</div>
</template> 

<script>
	import axios from 'axios';
	import baseUrl from '../../utils/baseurl.js';
	import basescss from '../../basescss/base.scss'
	import ElementUI from 'element-ui'
	
	export default {
    data() {
      return {
        activeName: 'second',
        value1: null,
        value2: null
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
	
</script>

<style>
	body,html{height:100px;}
	*{margin:0;padding:0;}
	#canteen{height:82px;display:flex;}
	#canteen li{flex:1;font-size:30px;line-height:82px;text-align: center;}
	#canteen .comment{color:red;}
	#canteen1{width:750px;font-size:70px;}
	.el-tabs__nav{position: relative;transform: translateX(-50%) !important;left:50%; transform: translateY(-50%);}
	.el-tabs__item{font-size:32px;padding:0 140px;position: relative; top:-12px;}
	/*.el-tabs__active-bar{width: 184px; transform: translateX(300px)!important;}*/
	
	#commentT{height:233px;border-bottom: 1px solid #ccc;}
	#commentT .commentTT{width:600px;height:65px;margin-left:35px;margin-top:35px;}
	.commentTT div{width:120px;height:64px;font-size:30px;color:#fff;background:#00A0DC;float: left;text-align: center;line-height: 64px;margin-right:20px;}
	#commentT .Ok{background:#CCECF7;color:#000;}
	#commentT .No{background:#EAEBED;color:#000;}
	#commentT .Ct{width:280px;height:48px;margin-left:38px;margin-top:64px;}
	.el-icon-circle-check{font-size:40px;float: left;}
	#commentT .Ct span{font-size:26px;line-height:45px;float: left;margin-left:5px;}
	
	#commentB{height:686px;margin-left:35px;overflow-x: hidden;}
	#commentB .ctb1{width:680px;height:225px;margin-top:30px;border-bottom:2px solid #ccc;}
	#headP{width:83px;height:225px;float: left;}
	#commentB .NameT{font-size:28px;}
	#commentB .NameT .time{float: right;}
	#commentB .star{font-size:30px;}
	.el-rate__icon{font-size:30px;}
	#commentB .main{font-size:28px;margin-top:20px;color:#000;}
	
</style>