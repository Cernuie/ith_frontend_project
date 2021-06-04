<template>
  <div>
    <br>
    <h1>Vue Google Maps</h1>

   <gmap-map :center="center" :zoom="10" style="width: 100%; height: 500px">
      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        {{infoContent}}
      </gmap-info-window>

      <gmap-marker :key="i" v-for="(m,i) in markers" :position="m.position" :clickable="true" @click="toggleInfoWindow(m,i)"></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: 43.6532, lng: -79.3832 },
      markers: [],
      currentPlace: null,
      infoContent: '',
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,

        //optional: offset infowindow so it visually sits nicely on top of our marker
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
    };
  },
  mounted: function() {
    //do an axios calls to get the markers from backend
    //if it doesn't work use test markers instead
    axios.get('localhost:8080/markers') 
      .then(response => this.markers = response.data)
      .catch(() => {
        this.markers = [
          {
              position: { lat: 43.6532, lng: -79.3832 },
              infoText:'Marker 1'
          },
          {
              position:{ lat: 43.6532, lng: -79.4832 },
              infoText:'Marker 2'
          },
          {
              position:{ lat: 43.7532, lng: -79.5832 },
              infoText:'Marker 3'
          }
      ]
      })
  },
  methods:{
     toggleInfoWindow: function(marker, idx) {

            this.infoWindowPos = marker.position;
            this.infoContent = marker.infoText;

            //check if its the same marker that was selected if yes toggle
            if (this.currentMidx == idx) {
              this.infoWinOpen = !this.infoWinOpen;
            }
            //if different marker set infowindow to open and reset current marker index
            else {
              this.infoWinOpen = true;
              this.currentMidx = idx;
        }
      },
  }
}
</script>
