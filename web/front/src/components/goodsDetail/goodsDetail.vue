<template>
  <el-container id="p_container">
  <h1>11223</h1>
    <div  >  
        <p v-for="(g2_detailitem, key) in g2_detail"  v-text ="g2_detailitem.title"></p>
    </div>
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
        var id = "1";
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