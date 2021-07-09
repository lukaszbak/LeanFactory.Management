

<template>
  <div id="app-layout">

      
     

      
      <div id="plans">
        Welcome to our Lean Factory Management simulator! <br> <br>
        This is designed to be an educational experience that students and teachers can use to learn about and apply the 8 pillars of lean, in a realtime simulation that takes place over a week. <br> <br>
        While this is a work in progress, The simulation itself is working however, is not running often, due to lack of funding. <br> <br>
        You are able to sign in and take a look around, and any emails to support@leanfactory.management, will be seen by staff that keep this page running. <br>

        <h2>Currently in development for the next version </h2><br>
        Plans for development include:
        <ul>
          <li>Increase/decrease in money</li>
          <li>What you missed since last login </li>
          <li>Number of jobs completed</li>
          <li>Largest queue</li>
          <li>Current Version Number including link to changelog</li>
          <li>Timestamp of the last time the server updated</li>
        </ul>
        <h2>Completed Items</h2>
        <ul>
          <li>MySQL Database and Node.js webserver hosted on AWS</li>
          <li>Simulation backend written in Python3</li>
          <ul>
            <li>Realtime calculations for all active simulations</li>
            <li>Creates a "Do nothing" team at the simulation start, that simulates a team doing nothing to compare performance to</li>
            <li>Easy to control commands for running the simulations </li>
            <li>Unit tests and extended test cases designed for all simulation functionality</li>
            <li>Debugging tools created to minimize logical errors </li>
            <li>Integration with the AWS database </li>              
          </ul>
          <li>Registration and login functionality using passport.js to manage sessions</li>
          <li>New users become copies of the "Do nothing" team and can join already active simulations </li>
          <li>The standings page shows where your team compares to others in the simulation </li>
          <li>Live graphs using D3.js display factory metrics over time </li>
          <li>Database</li>
          <ul>
            <li>Table and schema created with documentation</li>
            <li>Hosted securely on AWS</li>
            <li>All user inputs sanitized</li>
            <li>Extended schema designed with future additions of classes/teams of students in different simulations</li>
          </ul>
        </ul>

      </div>
        

   
        <router-view></router-view>
  </div>
</template>

<script>



  export default {
    
  }
</script>

<style scoped>
  #plans {
    margin: auto;
    width: 70%;
    text-align: left;
    color: white;
    margin-top: 5%;
    
  }
  li {
    margin-top: 1px;
    margin-bottom: 2px;
  }
</style>