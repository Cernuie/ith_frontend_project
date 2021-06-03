<script>
/* eslint-disable no-undef */
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
const GOOGLE_MAPS_API_KEY = 'AIzaSyD3UrjtZOyQfkcx10D9R0J3kiVlIzBO-Ac'
export default {
  name: 'App',
  setup() {
    const coords = ref({ latitude: 43.6532, longitude: -79.3832 })
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude
    }))
    const otherPos = ref(null)
    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
    const mapDiv = ref(null)
    let map = ref(null)
    let clickListener = null
    onMounted(async () => {
      await loader.load()
      map.value = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 7
      })
      clickListener = map.value.addListener(
        'click',
        ({ latLng: { lat, lng } }) =>
          (otherPos.value = { lat: lat(), lng: lng() })
      )
    })
    onUnmounted(async () => {
      if (clickListener) clickListener.remove()
    })    
    return { currPos, otherPos, mapDiv }
  }
}
</script>

<template>
  <div class="d-flex text-center" style="height: 20vh">
    <div class="m-auto">
      <h4>Your Position</h4>
      Latitude: {{ currPos.lat.toFixed(2) }}, Longitude:
      {{ currPos.lng.toFixed(2) }}
    </div>
    <div class="m-auto">
      <h4>Clicked Position</h4>
      <span v-if="otherPos">
        Latitude: {{ otherPos.lat.toFixed(2) }}, Longitude:
        {{ otherPos.lng.toFixed(2) }}
      </span>
      <span v-else>Click the map to select a position</span>
    </div>
  </div>
  <div ref="mapDiv" style="width: 100%; height: 80vh" />
</template>
