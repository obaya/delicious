<template>
  <el-container id="p_container" class="p_detail">

    <el-row >
      <div class="p_bg"></div>
      <el-col v-for="(g2_detailitem, key) in g2_detail"  >
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
  </el-container>     
                    

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
         }
       
    }, 
    mounted(){
        console.log(this.$route.query.id);
        var id = this.$route.query.id;
        baseUrl.get({
          url : "/getGoodsInfo",
          params : {id:id} 
        }).then(function(res){
          console.log(res.data) ;
          this.g2_detail = res.data; 
        }.bind(this))
      
    },



  }
</script>s