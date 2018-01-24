<template>
      <footer id="p_footer">
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple"><i class="el-icon-goods"></i>首页</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"><i class="el-icon-edit-outline"></i>点餐</div></el-col>
               <el-col :span="6" @click="jumpcart"><div class="grid-content bg-purple"><i class="el-icon-edit"></i>购物车</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"><i class="el-icon-goods"></i>我的</div></el-col>
          </el-row>
      </footer>

</template>

<script>
    import './footer.scss'
    import baseUrl from '../../utils/baseurl.js';
    export default {
      name: 'app',
      data () {
        return {
        }
      },
      // props:['route'],
      // methods:{
      //     jumpcart(){
      //         console.log(2);
      //     }
      // }

    }
</script>

