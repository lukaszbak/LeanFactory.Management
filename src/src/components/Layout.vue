<style>
    #sidebar { 
        width: 15%;
        height: 100%;
        position: fixed;
        left: 0%;
        top: 0%;
        padding-right: 1%;
        padding-left: 1%;
        background-color: #505050;
    }
    #content {
        margin-left: 15%;
        padding-left: 2%;
        background-color: #202020;
    }
</style>

<template>
  <div id="app-layout">
        <sidebar id="sidebar"></sidebar>
    
        <router-view id="content"></router-view>
  </div>
</template>

<script>
    import Sidebar from "./Sidebar.vue";

    export default {
        components: {
            Sidebar
        }
    }
</script>