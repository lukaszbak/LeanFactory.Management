<template>
  <div id="app">
    <head> 
      <title>Lean Factory Management</title>
    </head>
  <!-- the router outlet, where all matched components would ber viewed -->

  <!-- <router-link v-bind:to="'*'">Sidebar</router-link> -->
    <router-view></router-view>
  </div>
</template>

<script>
console.log("old app")
export default {
  name: 'app'
}
</script>
<!-- styling for the component -->
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #DDDDDD;
  /* margin-top: 60px; */
}
</style>
