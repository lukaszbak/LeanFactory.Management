

<template>
  <body style="">
  <div>
      <table id="materialTable">
        <!-- Display the material related information, and allow users to place new order amounts/thresholds, if placed incorrectly, users can effectively softlock into losing and being unable to produce -->
        <tr>
          <td>Kits:</td>
          <td>{{ materials }}</td>
          
        </tr>
        <tr>
          <td>Price per kit:</td>
          <td>{{ pricePerMaterial }}</td>
        </tr>
        <tr>
          <td>Order threshold:</td>
          <td>{{ currentOrderThreshold }}</td>
        </tr>
        <tr>
          <td>Order amount: </td>
          <td>{{ orderAmount }}</td>
        </tr>
        <tr>
          <td>Shipment in progress: </td>
          <td>{{ shipmentPlaced }}</td>
        </tr>
        <tr>
          <td>Shipment arrival day: </td>
          <td>{{ shipmentArrivalDay }}</td>
        </tr>
        <tr>
          <td>Shipment length:  </td>
          <td>{{ shipmentLength }}</td>
        </tr>
        <tr>
          <td>Shipment cost: </td>
          <td>{{ shipmentCost }}</td>
        </tr>
      </table>
      <br/> 
      Warning: Orders will not be placed, if there is not enough money to cover the order!
      <br/> <br/>
        Set order amount:     
        <input type="number" name="amount" v-model="orderAmountInput"/>
        <button @click="setMaterialOrderAmount" value="Set Amount">Set Amount</button>
        <br/>
        Set order threshold: 
        <input type="number" name="amount" v-model="orderThresholdInput"/>
        <button @click="setMaterialOrderThreshold" value="Set Amount">Set Amount</button>
        <br/>
      TODO Enter Graph of materials over time, with vertical lines for dates of order placements
      <br/>
      <svg width="500" height="500"></svg>
        <router-view></router-view>

      
  </div>
  </body>
</template>

<script>


  export default {
    //get required info when opening the page
    mounted() {
      //this.getFinances() 
      //this.getGraphData()
      //this.GetJobsCompleted()
      //this.GetProfit()
      this.getMaterialInfo()
    },
    data: function() {
      return {
        money: 0,
        graphData: {},
        contractType: 0,
        ticksPerDay: 0,
        materials: 0,
        currentOrderThreshold: 0,
        orderAmount: 0,
        shipmentPlaced: false,
        shipmentArrivalDay: "Not Placed",
        shipmentLength: 0,
        shipmentCost: 0,
        pricePerMaterial: 0,
        orderAmountInput: 0,
        orderThresholdInput: 0,

      }
    },
    methods: {
      //get the data required to generate a graph
      getGraphData: function() {
        axios.get()
        .then( (response) => {
          console.log("DATA");
          console.log(response.data);
          this.graphData = response.data
        })
      },
      
      getContractType: function() {
        axios.get("/api/contract_type")
        .then((response) => {
          console.log(response.data);
          this.contractType = response.data[0].ContractType
        })
      }, 
      
      setMaterialOrderAmount: function() {

        console.log("Asking to setMaterialOrderAmount: " + this.orderAmountInput)
        axios.get("/api/set_material_order_amount", {
          params: {
            amount: this.orderAmountInput
          }
        }).then ((response) => {
          this.getMaterialInfo();
        })
      },
      setMaterialOrderThreshold: function() {

        axios.get("/api/set_material_order_threshold", {
          params: {
            amount: this.orderThresholdInput
          }
        }).then ((response) => {
          this.getMaterialInfo();
        })
      },
      //get all info for materials, and if its placed get the additional info thats shown with the placed order
      getMaterialInfo: function() {
        axios.get("/api/get_material_info")
        .then((response) => {
          console.log(response.data[0]);
          this.materials = response.data[0].materials
          this.currentOrderThreshold = response.data[0].orderThreshhold
          this.orderAmount = response.data[0].orderAmount

          this.orderThresholdInput = this.currentOrderThreshold
          this.orderAmountInput = this.orderAmount

          this.ticksPerDay = response.data[0].ticksPerDay
          if (response.data[0].lastMaterialOrderTick != -1) {
            this.shipmentPlaced = true
        
            this.shipmentArrivalDay = Math.floor(((+response.data[0].lastMaterialOrderTick) / this.ticksPerDay) + ((+response.data[0].materialShipmentLength) / (+this.ticksPerDay)))
            console.log("LOOK HERE")
            console.log(this.ticksPerDay)
            console.log(response.data[0])
            console.log(this.shipmentArrivalDay)
            this.currentShipmentAmount = response.data[0].lastMaterialOrderAmount
          }
          else {
            this.shipmentPlaced = false
            this.shipmentArrivalDay = "Not placed"
          }
          this.shipmentLength = response.data[0].materialShipmentLength
          this.shipmentCost = response.data[0].shipmentCost
          this.pricePerMaterial = response.data[0].pricePerMaterial
        })
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
  #materialTable {
    position: relative;
    width: 300px;
    margin: auto;
    text-align: left;
    border-collapse: collapse ;
  }

  #materialTable tr{
    width: 50%;
    padding-left: 5px;
    border: 1px solid white;
  }
</style>