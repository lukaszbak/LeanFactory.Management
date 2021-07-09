
<template>
  <div id="app-layout">
      Finances
      <!-- write out all the financial information of the team/student -->
      <table id="FinancialsTable">
        <tr>
          <td id = "inTheBlack"> Revenues </td>
          <td id = "inTheBlack"> </td>
        </tr>
        <tr>
          <td id = "profit" >Starting cash: </td>
          <td id = "profit" >{{ startingCash }}</td>
        </tr>
        <tr>
          <td id = "profit" >Revenue: </td>
          <td id = "profit" >{{ revenue }}</td>
          
        </tr>
        <tr>
          <td id = "profit" >Interest: </td>
          <td id = "profit" >{{ interest }}</td>
        </tr>
        <tr>
          <td id = "inTheRed" > Costs </td>
          <td id = "inTheRed" > </td>
        </tr>
        <tr>
          <td id = "loss" >Equipment Costs: </td>
          <td id = "loss">{{ equipmentCosts }}</td>
        </tr>
        <tr>
          <td id = "loss">Inventory Costs: </td>
          <td id = "loss">{{ inventoryCosts }}</td>
        </tr>
        <tr>
          <td >Total Cash  </td>
          <td >{{ totalCash }}</td>
        </tr>
      </table> 

    </br> </br> 
    <!-- TODO -->
    Insert graph of Finances over time
      <router-view></router-view>
  </div>
</template>

<script>
  //Get finances on startup
  export default {
    mounted() {
      //this.getFinances() 
      //this.getGraphData()
      //this.GetJobsCompleted()
      //this.GetProfit()
      this.getFinances()
    },
    data: function() {
      return {
        money: 0,
        graphData: {},
        startingCash: 0,
        revenue: 0,
        interest: 0,
        equipmentCosts: 0,
        inventoryCosts: 0,
        totalCash: 0
      }
    },
    methods: {
      //Generates graphs from data
      getGraphData: function() {
        axios.get()
        .then( (response) => {
          console.log("DATA");
          console.log(response.data);
          this.graphData = response.data
        })
      },
      //Gathers finances from DB
      getFinances: function() {
        axios.get("/api/get_finances")
        .then((response) => {
          console.log(response.data)
          this.startingCash = response.data.startingCash
          this.revenue = response.data.revenue
          this.interest = response.data.interest
          this.equipmentCosts = response.data.equipmentCosts
          this.inventoryCosts = response.data.inventoryCosts
          this.totalCash = this.startingCash + this.revenue + this.interest - this.equipmentCosts - this.inventoryCosts
        })
      },
      //gets jobs completed from DB
      getJobsCompleted: function() {
        axios.get()
      }
    }
  }

</script>
<style>
  body {
    background-color:#202020; 
    color:white;
  }
  svg {
    background-color: #303030;
  }
  #FinancialsTable {
    position: relative;
    width: 300px;
    margin: auto;
    text-align: left;
    border-collapse: collapse ;
  }

  #FinancialsTable tr{
    width: 50%;
    padding-left: 5px;
    border: 1px solid white;
  }
  #inTheBlack {
    background-color: #33DD33;
    color: #000000;
  }
  #profit {
    background-color: #11AA11;
    color: #000000;
  }
  #inTheRed {
    background-color: #DD3333;
    color: #000000;
  }
  #loss {
    background-color: #AA1111;
    color: #000000;
  }
</style>