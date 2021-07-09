<style>
 #StandingsPage {
   position: relative;
 }

#StandingsTable {
     position: relative;
    width: 600px;
    margin: auto;
    text-align: left;
    border-collapse: collapse ;
}

#StandingsTable tr, #StandingsTable th, #StandingsTable td{
    width: 33%;
    padding-left: 5px;
    border: 1px solid white;
  }
</style>

<template>
  <div id="StandingsPage">
    Standings
    <!-- display the standings for each user/team in the class on the page -->
    <table id="StandingsTable" class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Team</th>
          <th>Cash</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(team,i) in standings" :key="i">
          <td> {{ j=i+1 }} </td>   
          <td>{{ team.name }}</td> 
          <td>{{ team.money }}</td>  
        </tr>
      </tbody>
    </table>
    <router-view></router-view>
  </div>
</template>

<script>




  export default {
    data: function() {
      return {
        headers: ["Teams", "Cash"],
        standings: [["A", "B"], ["C", "D"]]
      }
    },
     mounted() {
       this.getStandings();
     },
    methods: {
      getGraph: function(graph, minX, maxX, minY, maxY) {

      },
      getStandings: function() {
        axios.get("/api/get_standings").then( (response) => {
          this.standings = response.data
          console.log(response.data);
        })
      }
    }

  }
</script>