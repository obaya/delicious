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

}
</script>

<style lang="scss">
  #app{
    height:100%;
  }
</style>
