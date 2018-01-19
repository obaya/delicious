<template>
    <div id="app">
        <h1>delicious</h1>
        <router-view></router-view>
    </div>
</template>

<script>
  import axios from 'axios';
export default {
  name: 'app',
  data () {
    return {
    }
  },
  mounted(){
    axios.get("http://localhost:88/getschedule").then(response => {
        console.log(response)
    })
  }
}
</script>

<style lang="scss">
  #app{
    height:100%;
  }
</style>
