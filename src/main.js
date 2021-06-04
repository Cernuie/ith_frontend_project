import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import * as VueGoogleMaps from "vue2-google-maps"
const GOOGLE_MAPS_API_KEY = "AIzaSyD3UrjtZOyQfkcx10D9R0J3kiVlIzBO-Ac";

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login},
  { path: '/', component: Home},
];

const router = new VueRouter({
  routes
})

Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_MAPS_API_KEY,
    libraries: "places" // necessary for places input
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
