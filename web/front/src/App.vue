<template>
    <div id="app">
<<<<<<< HEAD
       
=======
>>>>>>> f276392a2cc822b3b6bf2873621dc47704e52ddc
        <router-view></router-view>
    </div>
</template>

<script>
  import axios from 'axios';
  import baseUrl from './utils/baseurl.js';
export default {
  name: 'app',
  data () {
    return {
    }
  },
  // 使用baseurl请求方式如下：
  // mounted(){
  //    baseUrl.get({
  //     url : "/getSlideShow" ,
  //     params : {这里是参数}
  //   }).then(function(res){
  //     // 这里获取返回的结果
  //     console.log(res)
  //   })
  // }
}
</script>

<style lang="scss">
  #app{
    height:100%;
  }
</style>
