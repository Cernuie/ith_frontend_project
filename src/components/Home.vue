<template>
  <div id="home">
    <Watchlist />
    <google-map />
  </div>
</template>

<script>
import Watchlist from "./Watchlist"
import GoogleMap from "./GoogleMap"
export default {
  name: 'Home',
  components: {
    Watchlist,
    GoogleMap,
  }
}
</script>