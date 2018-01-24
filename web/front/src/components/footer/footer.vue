<template>



      <footer id="p_footer">
          <el-row :gutter="20">
            <el-col :span="6" ><div class="grid-content bg-purple" @click = "index"><i class="el-icon-goods"></i>首页</div></el-col>
            <el-col :span="6" ><div class="grid-content bg-purple" @click = "food"><i class="el-icon-edit-outline"></i>点餐</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple" @click = "cart"><i class="el-icon-edit"></i>购物车</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple" @click = "mine"><i class="el-icon-goods"></i>我的</div></el-col>
          </el-row>
      </footer>

</template>

<script>
    import './footer.scss'
    import baseUrl from '../../utils/baseurl.js';
    export default {
      name: 'app',
  
       data() {
         return {
            Tfood:'',
         }  
       },
       props:['gid'],
       methods:{
            index: function(){
              
               this.$router.push({name:'home'});
             },
             food: function(){
                // this.$router.push({name:'eicart'});
                this.$router.push({name:'classify'});
               
             },
             cart:function(){
                if(this.Tfood){
                  this.$router.push({name:'tocart'});
                }else{
                  this.$router.push({name:'eicart'});
                }
             },
             mine:function(){
                this.$router.push({name:'mine'});
             }
       },
       mounted(){
          var cookie = document.cookie;
            console.log(cookie)//得到当前页面下的所有cookie
            cookie = cookie.split('; ');
            cookie.forEach(function(item){
              var arr = item.split('=');
              if(arr[1] === 'wai'){
                  this.Tfood = arr[1];
                  console.log(this.Tfood);
              }
          }.bind(this))
       }

    }
</script>

