import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps"
const GOOGLE_MAPS_API_KEY = "AIzaSyD3UrjtZOyQfkcx10D9R0J3kiVlIzBO-Ac";

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_MAPS_API_KEY,
    libraries: "places" // necessary for places input
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
