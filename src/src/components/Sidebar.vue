<template>
  <div id="Sidebar">
      <div id="nav_panel_title">
          Lean Factory Management Simulator
      </div>
      <!-- Display the navigation sidebar, as well as the amount of money, and what day the simulation is on -->
      <div id="nav_panel_content">
          <div id="nav_menu">
              <ul id="nav_menu_list">
                  <li class="nav_menu_item">
                      <router-link v-bind:to="'/home'">Home</router-link>
                  </li>
                  <li class="nav_menu_item">
                      <router-link v-bind:to="'/factory'">Factory Page</router-link>
                  </li>
                  <li class="nav_menu_item">
                      <router-link v-bind:to="'/jobs'">Job Orders / Materials</router-link>
                  </li>
                  <li class="nav_menu_item">
                      <router-link v-bind:to="'/finances'">Sales / Finances</router-link>
                  </li>
                  <li class="nav_menu_item">
                      <router-link v-bind:to="'/standings'">Class Standings</router-link>
                  </li>
                  <li class="nav_menu_item">
                      <router-link v-bind:to="'/credits'">Credits</router-link>
                  </li>
              </ul>
          </div>

          <div id="nav_panel_cash">
              CASH: {{ money }}
          </div>
          <div id="nav_panel_day">
              DAY {{ currentDay }} / {{ endDay }}
          </div>
          <br/>
          <div id="nav_panel_change_history">
              <div id="nav_panel_change_history_title">Change History (TODO)</div>
              <!-- <ul id="nav_panel_change_history_list">
                  <li class="nav_panel_change_history_item">________</li>
                  <li class="nav_panel_change_history_item">________</li>
              </ul> -->
          </div>
          <div id="export">
              <p>Export all Data</p>
          </div>
          <div id="logout">
              <a href="#" v-on:click="logout">Logout</a>
          </div>
      </div>
  </div>
</template>

<script>

  import router from "../main.js"
  export default {

    methods: {
      //allow users to logout, and redirect them to the login page
      logout: function (e) {
        axios.get("/api/logout")
          .then(() => {
            router.push("/login")
          })
      },
      
      getSidebarInfo: function() {
        axios.get("/api/sidebar").then( (response) => {
          console.log(response.data.money);
            this.money = response.data.money;
            this.currentDay = response.data.currentDay+1;
            this.endDay = response.data.endDay;
            console.log(window.location.pathname +" IS THE PATH NAME")
            /*if(window.location.pathname != '/') {
              window.setInterval(() => {
              this.getSidebarInfo()
              }, 5000) 
              this.getUserData();
              this.getSidebarInfo();
            } */
        });
      },
      
      //This logs user out
      getUserData: function() {    
        let self = this    
        axios.get("/api/user")      
          .catch((errors) => {    
              router.push("/login")    
          })    
      },

    },    
    mounted() { 
      this.getUserData();
      this.getSidebarInfo();  
    },
    data: function() {
      return {
        money: "",
        currentDay: "",
        endDay: "",
      }
    }
    
    
    
  }

</script>

<!-- styling for the component -->
<style scoped>
#Sidebar {
    float: left;
    background-color: #303030;
    overflow: hidden;
    height: 100vh;
    max-width: 50%;
}

#nav_menu_list {
  text-align: left;
}

#nav_panel_title {
    font-size: x-large;
    padding-top: 20px;
    padding-bottom: 50px;
    margin: auto;
}

#nav_panel_change_history_title {
    font-size: larger;
}

a{
  color:deepskyblue;
  text-decoration: none;

}
a:link{
  text-decoration: none;
}
a:visited{
  text-decoration: none;
}
a:hover{
  color: deepskyblue;
  text-decoration: bold;
}

br{
  margin: 4px 0;
}
</style>