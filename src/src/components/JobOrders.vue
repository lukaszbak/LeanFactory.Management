
<template>
  <body>
      
  <div id="app-layout">
      <div id="contractButtons">
        Current Contract Type: {{ contractType }}
        <button @click='setContractType(0)'>Set contract to 1</button>
        <button @click='setContractType(1)'>Set contract to 2</button>
        <button @click='setContractType(2)'>Set contract to 3</button>
          <div>
          ___________________________________________________________________
            <div>
              <!-- Create tables to show the contract information, currently displayed in 2 versions to test and see which is more intuitive for users -->
              <table id="contractTable">
                <tr>
                <tr>
                  <td class="col1">Contract 1:</td>
                  <td class="evenCol"></td>
                  <td>Contract 2:</td>
                  <td class="evenCol"></td>
                  <td>Contract 3:</td>
                  <td class="evenCol"></td>
                </tr>
                <tr>
                  <td class="col1">Max Time:</td>
                  <td class="evenCol">{{ contractInfo.maxTime1 }} days</td>
                  <td> Max Time:</td>
                  <td class="evenCol">{{ contractInfo.maxTime2 }} days</td>
                  <td> Max Time:</td>
                  <td class="evenCol">{{ contractInfo.maxTime3 }} days</td>
                </tr>
                <tr>
                  <td class="col1">Quoted time:</td>
                  <td class="evenCol">{{ contractInfo.quotedTime1 }} days</td>
                  <td>Quoted time:</td>
                  <td class="evenCol">{{ contractInfo.quotedTime2 }} days</td>
                  <td>Quoted time:</td>
                  <td class="evenCol">{{ contractInfo.quotedTime3 }} days</td>
                </tr>
                <tr>
                  <td class="col1">Revenue:</td>
                  <td class="evenCol">{{ contractInfo.revenue1 }}</td>
                  <td>Revenue:</td>
                  <td class="evenCol">{{ contractInfo.revenue2 }}</td>
                  <td>Revenue:</td>
                  <td class="evenCol">{{ contractInfo.revenue3 }}</td>
                </tr>
                <tr>
                  <td class="col1">Kits per job:</td>
                  <td class="evenCol">{{ contractInfo.kits1 }}</td>
                  <td>Kits per job:</td>
                  <td class="evenCol">{{ contractInfo.kits2 }}</td>
                  <td>Kits per job:</td>
                  <td class="evenCol">{{ contractInfo.kits3 }}</td>
                </tr>
              </table>
              <br/><br/><br/><br/><br/><br/>
              <table id="contractTable2">
                <tr>
                  <td></td>
                  <td>Contract 1:</td>
                  <td>Contract 2:</td>
                  <td>Contract 3:</td>
                </tr>
                <tr>
                  <td>Max Time:</td>
                  <td>{{ contractInfo.maxTime1 }} days</td>
                  <td>{{ contractInfo.maxTime2 }} days</td>
                  <td>{{ contractInfo.maxTime3 }} days</td>
                </tr>
                <tr>
                  <td>Quoted time:</td>
                  <td>{{ contractInfo.quotedTime1 }} days</td>
                  <td>{{ contractInfo.quotedTime2 }} days</td>
                  <td>{{ contractInfo.quotedTime3 }} days</td>
                </tr>
                <tr>
                  <td>Revenue:</td>
                  <td>{{ contractInfo.revenue1 }}</td>
                  <td>{{ contractInfo.revenue2 }}</td>
                  <td>{{ contractInfo.revenue3 }}</td>
                </tr>
                <tr>
                  <td>Kits per job:</td>
                  <td>{{ contractInfo.kits1 }}</td>
                  <td>{{ contractInfo.kits2 }}</td>
                  <td>{{ contractInfo.kits3 }}</td>
                </tr>
              </table>
          </div>
        </div>
      </div>
      <div> Jobs in progress </div>
      <table id="jobsInProgress">
        <tr>
          <td> Contract 1 jobs in progress: </td>
          <td> {{ numJobsInProgress1 }}</td>
        </tr>
        <tr>
          <td> Contract 2 jobs in progress: </td>
          <td> {{numJobsInProgress2 }} </td>
        </tr>
        <tr>
          <td> Contract 3 jobs in progress </td>
          <td> {{ numJobsInProgress3 }}</td>
          
        </tr>
        
      </table>


      <br/><br/><br/><br/><br/><br/>
    TODO enter graph of jobs accepted
    <br/><br/><br/><br/><br/><br/>
        
  </div>
  </body>
</template>

<script>


  export default {
    //Get all info needed on opening
    mounted() {
      //this.getFinances() 
      this.getGraphData()
      //this.GetJobsCompleted()
      //this.GetProfit()
      this.getContractType()
      this.getContractInfo()
      this.getJobsCompleted()
    },
    props: {
    },
    data: function() {
      return {
        money: 0,
        graphData: {},
        contractType: 0,
        ticksPerDay: 0,
        contractInfo: {
          maxTime1: 0,
          quotedTime1: 0,
          revenue1: 0,
          kits1: 0,
          maxTime2: 0,
          quotedTime2: 0,
          revenue2: 0,
          kits2: 0,
          maxTime3: 0,
          quotedTime3: 0,
          revenue3: 0,
          kits3: 0
        },
        numJobsInProgress1: 0,
        numJobsInProgress2: 0,
        numJobsInProgress3: 0

      }
    },
    methods: {
      //Generate a graph from the data
      getGraphData: function() {
        axios.get()
        .then( (response) => {
          console.log("DATA");
          console.log(response.data);
          this.graphData = response.data
        })
      },
      //get which contract the user has chosen
      getContractType: function() {
        axios.get("/api/contract_type")
        .then((response) => {
          console.log(response.data);
          this.contractType = response.data[0].contractType + 1
        })
      }, 
      //THIS SHOULD BE SET AS 0 / 1 / 2, BUT SHOULD DISPLAY AS 1 / 2 / 3 ON THE PAGE alONG WITH NAMES
      setContractType: function(x) {
        this.contractType = x
        axios.get("/api/set_contract_type", {
          params: {
            type: x
          }
        }).then ((response) => {
          this.getContractType();
        })
      },
      //get the contract infos
      getContractInfo: function() {
        axios.get("/api/get_contract_info") 
        .then(( response) => {
          this.ticksPerDay = response.data[0].ticksPerDay
          this.contractInfo.maxTime1 = response.data[0].timePerType1
          this.contractInfo.maxTime2 = response.data[0].timePerType2 
          this.contractInfo.maxTime3 = response.data[0].timePerType3
          this.contractInfo.quotedTime1 = response.data[0].timePerType1 / 2 
          this.contractInfo.quotedTime2 = response.data[0].timePerType2 / 2
          this.contractInfo.quotedTime3 = response.data[0].timePerType3 / 2
          this.contractInfo.revenue1 = response.data[0].revenuePerType1
          this.contractInfo.revenue2 = response.data[0].revenuePerType2
          this.contractInfo.revenue3 = response.data[0].revenuePerType3
          this.contractInfo.kits1 = response.data[0].kitsPerType1
          this.contractInfo.kits2 = response.data[0].kitsPerType2
          this.contractInfo.kits3 = response.data[0].kitsPerType3
        })
      },
      //get the jobs
      getJobsCompleted: function() {
        axios.get("/api/jobs_in_progress", {
          params: {
            getAll: 0
          }
        })
        .then(( response ) =>  {
          this.numJobsInProgress1 = response.data.numJobsInProgress1
          this.numJobsInProgress2 = response.data.numJobsInProgress2
          this.numJobsInProgress3 = response.data.numJobsInProgress3
        })
      }
    }
  }

</script>
<style>
  body {
    background-color:#101010;
    color:white;
  }
  svg {
    background-color: lightgray;
  }
  #contractTable, #contractTable2 {
    position: relative;
    width: 600px;
    margin: auto;
    text-align: left;
  }

  #contractTable {
    border-collapse: collapse ;
  }

  .col1 {
    border-left: 1px solid white;
  }

  .evenCol {
    border-right: 1px solid white;
  }


  #contractTable td {
    width: 16% ;
    padding-left: 5px;
  }

   #contractTable td {
    border-bottom: 1px solid white;
  }

  #contractTable2 {
    table-layout: fixed ;
    border-collapse: collapse ;
    border: 1px solid white;
  }

  #contractTable2 td {
    width: 25%;
        padding-left: 5px;
  }

  #contractTable2 td {
    border: 1px solid white;
  }

  #jobsInProgress {
    position: relative;
    width: 300px;
    margin: auto;
    text-align: left;
    border-collapse: collapse ;
  }

  #jobsInProgress tr{
    width: 50%;
    padding-left: 5px;
    border: 1px solid white;
  }

</style>