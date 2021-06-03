<script>
/* eslint-disable no-undef */
import { computed, ref, onMounted, onUnmounted } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
const GOOGLE_MAPS_API_KEY = "AIzaSyD3UrjtZOyQfkcx10D9R0J3kiVlIzBO-Ac";
export default {
  name: "App",
  setup() {
    //using the coordinates from toronto to initialize the map
    const coords = ref({ latitude: 43.6532, longitude: -79.3832 });
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    }));
    //initializes an other position for putting down marker later
    const otherPos = ref(null);
    //inits a loader as per js api loader documentation
    //creates the map on mount
    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
    const mapDiv = ref(null);
    let map = ref(null);
    let marker = ref(null);
    //let infowindow = ref(null)
    let clickListener = null;
    onMounted(async () => {
      //when component loads, waits for the loader and then creates a map
      //centered on Toronto for now
      await loader.load();
      map.value = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 10,
      });
      marker.value = new google.maps.Marker({
        position: { lat: 43.6532, lng: -79.3832 },
        map: map.value,
        title: "Hello World!",
      });
      // infowindow = new google.maps.InfoWindow({
      //   content: "<h1> Hello! </h1>"
      // })
      // markerListener = marker.value.addListener(
      //   "click",
      //   () => {infowindow.open(map, marker)
      //   })
      //adds a click listener that records the latlong of the click to use for creating the marker
      clickListener = map.value.addListener(
        "click",
        ({ latLng: { lat, lng } }) =>
        (otherPos.value = { lat: lat(), lng: lng() })
      );
      secondClickListener = map.value.addListener(
        "click",
        ({latLng: {lat, lng } }) => 
                (new google.maps.Marker({
        position: { lat: lat(), lng: lng() },
        map: map.value,
        title: "Hello World!",
      }))

      )
    });
    onUnmounted(async () => {
      if (clickListener) clickListener.remove();
      if (secondClickListener) secondClickListener.remove();
    });
    return { currPos, otherPos, mapDiv };
  },
  methods: {
    dropMarker(position, title) {
      let marker = new google.maps.Marker({
        position: position,
        setMap: map,
        title: title
      });
      this.map.addObject(marker)
    }
  },
};
</script>

<template>
  <div class="d-flex text-center" style="height: 20vh">
    <div class="m-auto">
      <h4>Your Position</h4>
      Latitude: {{ currPos.lat.toFixed(4) }}, Longitude:
      {{ currPos.lng.toFixed(4) }}
    </div>
    <div class="m-auto">
      <h4>Clicked Position</h4>
      <span v-if="otherPos">
        Latitude: {{ otherPos.lat.toFixed(4) }}, Longitude:
        {{ otherPos.lng.toFixed(4) }}
      </span>
      <span v-else>Click the map to select a position</span>
    </div>
  </div>
  <div ref="mapDiv" style="width: 100%; height: 80vh" />
</template>
