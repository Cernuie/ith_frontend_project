<template>
  <GoogleMap
  api-key="AIzaSyD3UrjtZOyQfkcx10D9R0J3kiVlIzBO-Ac"
  style="width: 100%; height: 500px"
  :center="center"
  :zoom="10"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat: 40.689247, lng: -74.044502 }

    return { center }
  },
})
</script>
