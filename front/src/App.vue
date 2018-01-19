<template>
    <div id="app">
        <h1>delicious</h1>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  #app{
    height:100%;
  }
</style>
