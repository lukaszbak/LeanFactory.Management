

<template>
  <div id="app-layout">
    <!-- draw all machines to screen, as well as their controls -->
      Machine {{ machineNum }}
      <div id="numMachines">
        Cost to buy machine: {{ buyPrice }}
        <br/>
        Cost to sell machine: {{ sellPrice }}
        <br/>
        Number of machines: {{ numMachines }}
        <button v-on:click='buyMachine'>Buy 1</button>
        <button v-on:click='sellMachine'>Sell 1</button>
        <br/>
        <button v-if="this.machineNum == 2" @click='setMachine2Priority(0)'>Set Priority to FIFO</button>
        <button v-if="this.machineNum == 2" @click='setMachine2Priority(1)'>Set Priority to Process 2</button>
        <button v-if="this.machineNum == 2" @click='setMachine2Priority(2)'>Set Priority to Process 4</button>
        <div v-if="this.machineNum == 2">Priority<div v-if="this.priority == 0"> FIFO </div> <div v-if="this.priority == 1"> Process 2</div> <div v-if="this.priority == 2"> Process 4 </div>
        </div>
      </div>
      <div id="machineWrapper">
        <!-- draw all machine graphs to screen -->
        <div :id="'graphs1'+machineNum" class="graph"></div>
        <div :id="'graphs2'+machineNum" class="graph"></div>
      </div>
  </div>
</template>

<script>
  import * as d3 from "d3";
  

  export default {
    //get all required data on page open
    mounted() {
      this.getTicks()
      this.getNumMachines()
      this.getGraphData()
      this.getMachine2Priority()

      this.getMachinePrices()
    },
    props: {
      machineNum: {
        type: Number,
        required: true
      }
    },
    data: function() {
      return {
        numMachines: 0,
        graphData: {},
        priority: 0,
        ticksPerDay: 5,
        buyPrice: 0,
        sellPrice: 0
      }
    },
    methods: {
      
      getTicks: async function() {
        await this.getTicksPerDay();
        console.log("ticksperday" + this.ticksPerDay);
      },
      
      getNumMachines: function() {
        axios.get("/api/get_team_variable", {
          params: {
            column: "numMachines"+this.machineNum
          }
        }).then( (response) => {
           this.numMachines = response.data.data;
        });
      },
      getTicksPerDay: function() {
        axios.get("/api/get_ticksPerDay").then( (response) => {
          this.ticksPerDay = response.data.ticksPerDay;
        });
      },
      //buy a machine, default value of 1 machine
      buyMachine: function() {
        axios.get("/api/buy_machine"+this.machineNum, {
          params: {
            amount: 1,
            gettingMoney: 0
          }
        }).then( (response) => {
          this.getNumMachines()
        })
      },
      sellMachine: function() {
        axios.get("/api/sell_machine"+this.machineNum, {
          params: {
            amount: 1,
            gettingMoney: 0
          }
        }).then( (response) => {
          this.getNumMachines()
        })
      },
      //generate a graph with the data
      getGraphData: function() {
        axios.get("/api/machine"+this.machineNum+"_tick_data")
        .then( (response) => {
          this.processData(response.data)
        })
      },
      getMachine2Priority: function() {
        axios.get("api/current_priority")
        .then( (response) => {
          this.priority = response.data[0].machine2Priority
        })
      },
      setMachine2Priority: function(x) {
        this.priority = x
        axios.get("api/set_machine2_priority", {
          params: {
            priority: x
          }
        }).then ((response) =>  {
          this.getMachine2Priority();
        })
      },
      getMachinePrices: function() {
        axios.get("/api/machine" +this.machineNum+"_prices")
        .then( (response) => {
          this.buyPrice = response.data[0]["machine" + this.machineNum+"Cost"]
          this.sellPrice = response.data[0]["machine" + this.machineNum+"SellPrice"]
        })
      },
      //process data for the graphs being displayed
      //BUG: sometimes this gets skipped due to asyncronous display of the page and loading
      processData: function(data) {
        console.log("PROCESSING DATA")
        data.forEach( (row) => {
          row.day = row.tickNum / this.ticksPerDay
        })
        /*var newDataProductivity = []
        console.log("Length" + data.length)
        for (var i = 0; i < ((data.length) / this.ticksPerDay); i++) {
          var sumProductivity = 0
          for(var j = 0; j < this.ticksPerDay; j++) {
            sumProductivity += data.row[i+j].productivity
            newDataProductivity.push(sum / this.ticksPerDay)
          }
        }
        */
        data.shift()
        this.graphData = data

        if(this.machineNum == 2) {
          this.createUtilizationGraph("Machine "+this.machineNum+" Utilization 1", this.graphData);
          this.createBufferGraph("Machine "+this.machineNum+" Buffer 1", this.graphData);
          this.createUtilizationGraph2("Machine"+this.machineNum+" Utilization 2", this.graphData);
          this.createBufferGraph2("Machine "+this.machineNum+" Buffer 2", this.graphData);
        } else {
          this.createUtilizationGraph("Machine "+this.machineNum+" Utilization", this.graphData);
          this.createBufferGraph("Machine "+this.machineNum+" Buffer", this.graphData);
        }

      },
      //create a graph to show the utilization of the machines (currently digital instead of analog as it reads tick values vs daily averages)
      createUtilizationGraph: function(name, data) {
        var width = 300;
        var height = 300;
        var margin = {top: 50, right: 30, bottom: 30, left: 60},
          width = 460 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;
        var svg = d3.select("#graphs1"+this.machineNum).append("svg")
          .style("background-color", "beige")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("text")
          .attr("x", (width / 2))             
          .attr("y", 0 - (margin.top / 2))
          .attr("text-anchor", "middle")  
          .style("font-size", "16px") 
          .style("text-decoration", "underline")  
          .text("Machine"+this.machineNum+" Utilization");
        var maxDay = Math.ceil(d3.max(data, function(d) { return +d.day;}))
        var numTicks = Math.min(maxDay, 8);
          // Add X axis -->
        var x = d3.scaleLinear()
          .domain([0, maxDay])
          .range([ 0, width ]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x).ticks(numTicks).tickFormat( (d) => {
            return +d;
          }));


        var y = d3.scaleLinear()
          .domain([0, 1])
          .range([ height, 0 ]);
         svg.append("g")
           .call(d3.axisLeft(y).ticks(4).tickFormat(d3.format(".0%")))

        // Add the line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1)
          .attr("d", d3.line()
            .x(function(d) { return x(d.day) })
            .y(function(d) { return y(d.productivity) })
            )

      },
      //create a graph to show how many jobs are in the buffer for the machine
      createBufferGraph: function(name, data) {
        var width = 300;
        var height = 300;
        var margin = {top: 50, right: 30, bottom: 30, left: 60},
          width = 460 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;
        var svg = d3.select("#graphs1"+this.machineNum).append("svg")
          .style("background-color", "beige")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("text")
          .attr("x", (width / 2))             
          .attr("y", 0 - (margin.top / 2))
          .attr("text-anchor", "middle")  
          .style("font-size", "16px") 
          .style("text-decoration", "underline")  
          .text("Machine"+this.machineNum+" Buffer");
        var maxDay = Math.ceil(d3.max(data, function(d) { return +d.day;}))
        var numTicks = Math.min(maxDay, 8);
          // Add X axis -->
        var x = d3.scaleLinear()
          .domain([0, maxDay])
          .range([ 0, width ]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x).ticks(numTicks).tickFormat( (d) => {
            return +d;
          }));


        var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { return +d.queue; })])
          .range([ height, 0 ]);
         svg.append("g")
           .call(d3.axisLeft(y).ticks(4).tickFormat( (d) => {
             return d + " Kits"
           }))

        // Add the line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.day) })
            .y(function(d) { return y(d.queue) })
            )
      },
      //create a graph for the utilization of the second machine (currently digital instead of analog as it reads tick values vs daily averages)
      createUtilizationGraph2: function(name, data) {
        var width = 300;
        var height = 300;
        var margin = {top: 50, right: 30, bottom: 30, left: 60},
          width = 460 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;
        var svg = d3.select("#graphs2"+this.machineNum).append("svg")
          .style("background-color", "beige")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("text")
          .attr("x", (width / 2))             
          .attr("y", 0 - (margin.top / 2))
          .attr("text-anchor", "middle")  
          .style("font-size", "16px") 
          .style("text-decoration", "underline")  
          .text(name);
        var maxDay = Math.ceil(d3.max(data, function(d) { return +d.day;}))
        var numTicks = Math.min(maxDay, 8);
          // Add X axis -->
        var x = d3.scaleLinear()
          .domain([0, maxDay])
          .range([ 0, width ]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x).ticks(numTicks).tickFormat( (d) => {
            return +d;
          }));


        var y = d3.scaleLinear()
          .domain([0, 1])
          .range([ height, 0 ]);
         svg.append("g")
           .call(d3.axisLeft(y).ticks(4).tickFormat(d3.format(".0%")))

        // Add the line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.day) })
            .y(function(d) { return y(d.productivity2) })
            )

      },
      //create a graph to show the buffer of the second machine
      createBufferGraph2: function(name, data) {
        var width = 300;
        var height = 300;
        var margin = {top: 50, right: 30, bottom: 30, left: 60},
          width = 460 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;
        var svg = d3.select("#graphs2"+this.machineNum).append("svg")
          .style("background-color", "beige")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("text")
          .attr("x", (width / 2))             
          .attr("y", 0 - (margin.top / 2))
          .attr("text-anchor", "middle")  
          .style("font-size", "16px") 
          .style("text-decoration", "underline")  
          .text(name);
        var maxDay = Math.ceil(d3.max(data, function(d) { return +d.day;}))
        var numTicks = Math.min(maxDay, 8);
          // Add X axis -->
        var x = d3.scaleLinear()
          .domain([0, maxDay])
          .range([ 0, width ]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x).ticks(numTicks).tickFormat( (d) => {
            return +d;
          }));


        var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { return +d.queue2; })])
          .range([ height, 0 ]);
         svg.append("g")
           .call(d3.axisLeft(y).ticks(4).tickFormat( (d) => {
             return d + " Kits"
           }))

        // Add the line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.day) })
            .y(function(d) { return y(d.queue2) })
            )
      }  
    }
  }

</script>
<style>
  svg {
    background-color: beige;
  }
  #machineWrapper {
    display: inline-block;
    padding: 10px;
    background-color:#000000;
    color: #000000
  }
</style>