<template>



      <footer id="p_footer">
          <el-row :gutter="20">
            <el-col :span="6" ><div class="grid-content bg-purple _index"  @click = "index"><i class="el-icon-goods"></i>首页</div></el-col>
            <el-col :span="6" ><div class="grid-content bg-purple classify" @click = "food"><i class="el-icon-edit-outline"></i>点餐</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple cart" @click = "cart"><i class="el-icon-edit"></i>购物车</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple mine" @click = "mine"><i class="el-icon-goods"></i>我的</div></el-col>
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
       props:['gid','color'],
       methods:{

            index: function(){
              
               this.$router.push({name:'home'});
             },
             food: function(){
                this.$router.push('classify');
               
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
         if(this.color=='index'){
            var infoot = document.getElementsByClassName('_index')[0];
            infoot.style.color='#409EFF';
         }else if(this.color=='mine'){
            var mine = document.getElementsByClassName('mine')[0];
            
            mine.style.color='#409EFF';
         }else if(this.color=='cart'){
            var mine = document.getElementsByClassName('cart')[0];
            
            mine.style.color='#409EFF';
         }else if(this.color=='classify'){
            var mine = document.getElementsByClassName('classify')[0];
            
            mine.style.color='#409EFF';
         }




         var cookie = this.Cookie.getCookie('Take_out')
          if(cookie === 'wai'){
              this.Tfood = cookie;
          }

       }

    }
</script>