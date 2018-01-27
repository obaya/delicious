<template>
	<div id="app">
    <img src="../../assets/head2.png" alt="" width="100%" height="165px" />

		<ul id="canteen" style="display:flex;">
			<!-- <el-tabs v-model="activeName" @tab-click="handleClick" id="canteen1" style="display:flex;"> -->
			    <!-- <el-tab-pane :label="wai" name="first"></el-tab-pane>
			    <el-tab-pane label="评论" name="second" style="color:#333;"></el-tab-pane> -->
          <li class="wai" @click="towai" style="flex:1;">{{wai}}</li>
          <li style="flex:1;color:#409EFF" >评论</li>
			<!-- </el-tabs> -->
		</ul> 
		<div id="commentT">
			<div class="commentTT">
				<div class="all" @click="total">全部</div>
				<div class="Ok" @click="ok">满意</div>
				<div class="No" @click="no">不满意</div>
			</div>
			<div class="Ct">
				<i class="el-icon-circle-check"></i>
				<span>只看又内容的评论</span>
			</div>
				 <ul class="pagination">
            <li class="page-item" v-for="p in qty" @click="page(p)"><a class="page-link">{{p}}</a></li>
         </ul>          
		</div>
		<div id="commentB">
			<div class="ctb1" v-for="(item,index) in now" :key="index">
				<div id="headP"><img src="../../assets/headP.png" alt="" /></div>
				<div class="NameT"><span>{{item.userName}}</span><span class="time">{{item.update_at.match(/(\S*)T/)[1]}}</span></div>
				<div class="block">
				<el-rate
				  v-model="item.grade"
				  disabled
				  show-score
				  text-color="#ff9900"
				  score-template="{value}">
				</el-rate>
				</div>
				

				<div class="main">{{item.comment}}</div>
				
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
        value2: null,
        userComment:[],
        pageComment:[],
        sati:[],
        yamp:[],
        qty:0,
        now:'',
        wai:'堂食'
      };
    },
    methods: {
      // handleClick(tab, event) {
      //   this.$router.push({path:'/classify'});
      // },
      towai(){
        this.$router.push({path:'/classify'});

      },
      ok(){
          this.qty=Math.ceil(this.sati.length/5);
        	  if(this.qty>=5){
        	  	 for(var i=0;i<5;i++){
        	  	  
                      this.pageComment[i]=this.sati[i];
        	  	  	   
        	   }
        	  }else{
        	   	  for(var i=0;i<this.qty;i++){
        	  	  
                      this.pageComment[i]=this.sati[i];
        	  	  	   
        	   }
        	   }
        	  
        	  this.now=this.pageComment;
        	  this.$forceUpdate();
      },
      no(){
      	 this.qty=Math.ceil(this.yamp.length/5);
        	  if(this.qty>=5){
        	  	for(var i=0;i<5;i++){
        	  	  
                      this.pageComment[i]=this.yamp[i];
        	  	  
        	   }
        	  }else{
        	   	  for(var i=0;i<this.qty;i++){
        	  	  
                      this.pageComment[i]=this.yamp[i];
        	  	  	   
        	   }
        	   }
        	  
        	  this.now=this.pageComment;
        	  this.$forceUpdate();
      },
      total(){
      	  this.qty=Math.ceil(this.userComment.length/5);
        	  if(this.qty>=5){
        	  	for(var i=0;i<5;i++){
        	  	   this.pageComment[i]=this.userComment[i];
        	  }
        	  }
        	  
        	  this.now=this.pageComment;
      },
      // page(p){
      // 	  // console.log(p);
      // 	  var j=Math.ceil(this.userComment.length/this.qty)*p-5;
      //     for(var i=0;i<5;i++){
      //          if(!this.userComment[j]){
      //           this.pageComment[i]=this.userComment[j];
      //            j++;
      //          }
      //     }

      // 	  // this.now=this.pageComment;
      // 	  console.log(this.now);
      // 	 this.$forceUpdate();
      // }
      page(p){
          // console.log(p);
          if(p==1){
             this.qty=Math.ceil(this.userComment.length/5);
            for(var i=0;i<5;i++){
                 this.pageComment[i]=this.userComment[i];
            }
            this.now=this.pageComment;
          } else{
             if(this.userComment.length%5==0){
             var j=Math.ceil(this.userComment.length/this.qty)*p-5;
                      for(var i=0;i<5;i++){
                           
                            this.pageComment[i]=this.userComment[j];
                             j++;
                           
                         
                      }
          }else{
            var j=Math.floor(this.userComment.length/this.qty)*p-5;
                      for(var i=0;i<5;i++){
                           
                            this.pageComment[i]=this.userComment[j];
                             j++;
                           
                         
                      }
          }
          }
         this.$forceUpdate();
      }

    },
    mounted(){
        var cookie = this.Cookie.getCookie('Take_out')
        if(cookie == 'wai'){
          this.wai = "外卖"
        }
        baseUrl.get({
        	url:'/getcomment',

        }).then(res=>{
          console.log(res)
        	  this.userComment=res.data;
        	  this.qty=Math.ceil(this.userComment.length/5);
        	  for(var i=0;i<5;i++){
        	  	   this.pageComment[i]=this.userComment[i];
        	  }
        	  this.now=this.pageComment;
console.log(this.now)
        	  //获取等级;
        	  this.userComment.forEach((item,index)=>{
              if(item.grade>=3){
                  this.sati.push(item);
              }else{
              	 this.yamp.push(item);
              }
      	  })
        	  
        })
    }
  };
	
</script>

<style>
	#canteen{height:1.093rem;display:flex;}
	#canteen li{flex:1;font-size:0.4rem;line-height:1.093rem;text-align: center;}
	#canteen .comment{color:red;}
	#canteen1{width:10.0rem;font-size:0.933rem;}
	.el-tabs__nav{position: relative;transform: translateX(-50%) !important;left:50%; transform: translateY(-50%);}
	.el-tabs__item{font-size:0.427rem;padding:0 1.867rem;position: relative; top:-0.16rem;}
	/*.el-tabs__active-bar{width: 184px; transform: translateX(300px)!important;}*/
	
	#commentT{height:3.107rem;border-bottom: 0.013rem solid #ccc;}
	#commentT .commentTT{width:8.0rem;height:0.867rem;margin-left:0.467rem;margin-top:0.467rem;}
	.commentTT div{width:1.6rem;height:0.853rem;font-size:0.4rem;color:#fff;background:#00A0DC;float: left;text-align: center;line-height: 0.853rem;margin-right:0.267rem;}
	#commentT .Ok{background:#CCECF7;color:#000;}
	#commentT .No{background:#EAEBED;color:#000;}
	#commentT .Ct{width:3.733rem;height:0.64rem;margin-left:0.507rem;margin-top:0.009rem;}
	.el-icon-circle-check{font-size:0.533rem;float: left;}
	#commentT .Ct span{font-size:0.347rem;line-height:0.6rem;float: left;margin-left:0.067rem;}
	
	#commentB{height:10.6rem;margin-left:0.467rem;overflow-x: hidden;}
	#commentB .ctb1{width:9.067rem;height:3.0rem;margin-top:0.4rem;border-bottom:0.027rem solid #ccc;position:relative;}
	#headP{width:1.107rem;height:3.0rem;float: left;}
	#commentB .NameT{font-size:0.373rem;}
	#commentB .NameT .time{float: right;}
	#commentB .star{font-size:0.4rem;}
	.el-rate__icon{font-size:0.4rem;}
	#commentB .main{font-size:0.373rem;margin-top:0.267rem;color:#000;}
	.page-item{float:left;padding:0 0.15rem;font-size:0.4rem;background-color: #ccc;border-radius:50%;margin:0.066667rem 0.133333rem 0;}
 a{color:#333;}
    .pagination{margin-left:0.3rem;margin-top:0.2rem;}
    .block{position:absolute;left:0.933rem;top:0.933rem;}
</style>