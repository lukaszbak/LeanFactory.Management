// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import the vue instance
import Vue from 'vue'
//import the App component
import App from './App'
//import the vue router
import VueRouter from 'vue-router'
//tell vue to use the router
Vue.use(VueRouter)
    /* eslint-disable no-new */


//import the component pages
import Sidebar from './components/Sidebar'
import Factory from './components/Factory'
import Jobs from './components/Jobs'
import Finances from './components/Finances'
import Standings from './components/Standings'
import Login from './components/Login'
import Home from './components/Home'
import Credits from './components/Credits'
//Importing ads from google
import Ads from 'vue-google-adsense'
Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)
//define your routes
const routes = [
    //route for the home route of the webpage
    //{ path: '/', component: Hello },
    // //route for the about route of the webpage
    //{ path: '/about', component: About },

    //{ path: '/newPage', component: NewPage },
    {
        path: '/',
        name: 'layout',
        component: Vue.component("Home", require("./components/Layout.vue")),
        children: [
            //route for the pages
            { path: '/home', component: Home },
            { path: '/factory', component: Factory },
            { path: '/jobs', component: Jobs },
            { path: '/finances', component: Finances },
            { path: '/standings', component: Standings },
            { path: '/credits', component: Credits}


        ]
    },
    {
        path: '/sidebar',
        name: "sidebar",
        component: Sidebar
    },
    { path: '/login', name: "Login", component: Login },
]

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
        routes, // short for routes: routes
        mode: 'history'
    })
    //instatinat the vue instance


new Vue({
        //define the selector for the root component
        el: '#app',
        //pass the template to the root component
        template: '<App/>',
        //declare components that the root component can access
        components: { App },
        //pass in the router to the vue instance
        router,
    }).$mount('#app') //mount the router on the app


export default router;