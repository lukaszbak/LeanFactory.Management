<template>
    <html>
        <head> 
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <div class="wrapper">
            <!-- Handle the login page, inputs, and outputs -->
            <div id="loginContent">
                <h1>Lean Factory Management Simulator <br>
                    Alpha build 0.1a</h1>
                <h2>Log In</h2>    
                <form v-on:submit="login">    
                    <label for= "fname" class="inputLabel">Enter Last Name:</label> <br>
                    <input type="text" name="name" class="inputText" /><br>  
                    <label for= "lname" class="inputLabel">Enter Team ID:</label> <br>
                    <input type="teamID" name="teamID" class="inputText" /><br>
                    <input type="submit" value="Login" class="pageButtons" /> 
                </form>
                <h2> Register </h2>
                <p>Warning, do not input sensitive information, as they are stored in plaintext, and visible to all users </p>  
                <form v-on:submit="register"> 
                    <label for= "fname" class="inputLabel">Enter First Name:</label> <br>
                    <input type="text" name="firstName" class="inputText"/><br>    
                    <label for= "lname" class="inputLabel">Enter Last Name:</label> <br>
                    <input type="text" name="lastName" class="inputText"/><br>
                    <input type="submit" value="Register" class="pageButtons" />   
                    <br/>
                </form>    

               
            </div>
             <home id="homeContent"></home>
        </div>
        <footer>Created by: Lukasz Bakun, Sean McCulloch, Kyle McCulloch </footer>
    </html>
</template>


<script>
    console.log("login.vue")
    import router from "../main.js"
    import Home from "./Home.vue";
    
    export default {   
        name: "Login",    
        components: {
            Home
        },
        methods: { 
            //attempt to login using the input information 
            login: (e) => {    
                e.preventDefault()    
                console.log("USER INFO");
                
                let name = e.target.elements.name.value
                console.log(name);
                let teamID = e.target.elements.teamID.value
                console.log(teamID);
                let login = () => {    
                    let data = {    
                        email: name,    
                        password: teamID    
                    }    
                    axios.post("/api/login", data)    
                        .then((response) => {      
                            router.push("/home")    
                        })    
                        .catch((errors) => {   
                            alert("Cannot log in");    
                        })    
                }    
                login()    
            },     
            //allow a user to input new information into the database, tested so that "naughty" code should not be entered. (ie: drop tables)
            register: function(e) {
                e.preventDefault()  
                let last = e.target.elements.lastName.value
                let first = e.target.elements.firstName.value
                axios.get("/api/register", {
                    params: {
                        firstName: first,
                        lastName: last
                    }
                }).then ((response) => {
                    console.log("REGISTER RESPONSE")
                    console.log(response)
                    console.log(response.data)
                    console.log(response.data[0])
                    alert("Registered, sign in with Last Name: " + response.data[0]["@last_name"] + " and Team ID: " + response.data[0]["@team_id"]);
                })
            },
        }      
    }    
</script>

<style scoped>
    footer {
        text-align: left;
    }
    #loginContent,  #homeContent {
        float: left;
    }

    #loginContent {
        width: 40%;
    }

    #homeContent {
        width: 60%;
    }

    h2{
        text-align: left;
        border-style: none none double none;
        border-width: thick;
        margin-left: 20px;

    }

    h1{
        text-align: left;
        font-size: 1em;
    }
    h1:first-line{
        text-align: left;
        font-size: 2em;
        
    }

    form{
        text-align: left;
        padding-left: 40px;

    }

    .inputLabel{
        margin-bottom: 50px;
        text-align: right;
        height: 200px;
    }
    br{
        margin: 4px 0;
    }

    .pageButtons{
        width: 150px;
        height: 30px;
    }
    input{
        font-size: 1em;
        box-sizing: border-box;
    }
    p{
        text-align: left;
        margin-left: 40px;
        color: #bb0000
    }

    footer{
        text-align: bottom;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2.5rem;
    }

</style>