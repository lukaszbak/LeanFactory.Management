<style>

</style>
<!-- draw all machine vues to screen -->
<template>
  <div id="app-layout">
        Factory
        <machine-detail :machineNum=1 ></machine-detail>
        <br/>
        <machine-detail :machineNum=2 ></machine-detail>
        <br/>
        <machine-detail :machineNum=3 ></machine-detail>
        <router-view></router-view>
  </div>
</template>

<script>
  import Machine from './Machine.vue'

  export default {
    components: {
      'machine-detail': Machine
    }
  }
</script>