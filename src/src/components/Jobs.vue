<template>
  <div id="app-layout">
      <div id="jobpage"> 
        <!-- display jobs and our materials for those jobs -->     
        Jobs  
        <job-orders></job-orders>
        <router-view></router-view>
        Materials
        <material-orders></material-orders>
      </div>


  </div>
</template>

<script>
  import Jobs from './JobOrders.vue'
  import Materials from './Materials.vue'


  export default {
    components: {
      'job-orders': Jobs,
      'material-orders': Materials
    },
    //all of these were implemented in JobOrders so they are Legacy for now
    Methods: {
      getJobsAccepted: function() {
        
      },
      getContractInfo: function() {

      },
      getJobsInProgress: function() {

      },
      getMaterialSettings: function() {

      },
      getMaterialInfo: function() {

      },
      getGraph: function(graph, minX, maxX, minY, maxY) {

      }
    }
    
  }
</script>
<style scoped>
  #jobpage{
    background-color:#202020;
    color:white;
  } 
</style>