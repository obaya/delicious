<template>
    <div class='header'>
           <div class="left"  @click="pres">
             <span class="el-icon-arrow-left return" ></span>
             <h2>返回</h2>
           </div>
           <span class="center">购物车</span>
    </div>
</template>
<script type="text/javascript">
    import './eheader.scss';
     export default{
            data(){
                return {
            
                }
            },
            // beforeMount(){
                
            // },
            methods:{
               pres(){
                   this.$router.go(-1);
               }
            },
          
            
     }
</script>