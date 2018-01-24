<template>
    <div id="app">
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
