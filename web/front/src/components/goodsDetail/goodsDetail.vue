<template>
  <div id="p_container" class="p_detail" style="height:0"  >
    
    <el-row >
      <div class="p_bg" style="height:10000px;width:100%" ></div>
      <el-col v-for="(g2_detailitem, key) in g2_detail" >
        <i class="el-icon-error" id="close" @click='back'></i>
        <el-card :body-style="{ padding: '19px' }">
          <img v-bind:src="g2_detailitem.imgUrl" class="image">
        
          <div >
            <div class="bottom clearfix"> 
               <span style="float: left;margin-right:30px" v-text ="g2_detailitem.title"></span>   
               <span  v-text ="'价格：'+'￥'+g2_detailitem.newPrice"></span>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col> 
    </el-row>
  </div>     
                    
</template>

<script>
  import $ from 'jquery'
  import './goodsDetail.scss'
  import baseUrl from '../../utils/baseurl.js';
  
  export default {
    name: 'app',
    data() {
      return {
        g2_detail: [],
        show:false
      }  
    },
    props:['gid'],
    methods:{
         back:function(){
          this.$emit('increment')
        },
    }, 
    mounted(){
    
        var id = this.gid;
        baseUrl.get({
          url : "/getGoodsInfo",
          params : {id:id} 
        }).then(function(res){
          this.g2_detail = res.data; 
        }.bind(this))
      
    },



  }
</script>s