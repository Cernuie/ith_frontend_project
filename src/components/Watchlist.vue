
<template>
  <!-- For now load test markers, ideally would get marker + marker status from axios call -->
  <div>
    <h1>P.O.I Watchlist</h1>
    <div>
      <table>
        <thead>
          <tr>
            <th>Point of Interest</th>
            <th>Status</th>
            <th>Change Status?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Point A</td>
            <td>Up</td>
            <td>
              <button class="btn btn-change" @click="handleEdit(item.id)">
                Edit Status
              </button>
            </td>
          </tr>
          <tr>
            <td>Point B</td>
            <td>Down</td>
            <button class="btn btn-change" @click="handleEdit(item.id)">
              Edit Status
            </button>
          </tr>
          <tr>
            <td>Point C</td>
            <td>Unstable</td>
            <button class="btn btn-change" @click="handleEdit(item.id)">
              Edit Status
            </button>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Watchlist",
  methods: {
    //make handleEdit actually work
  },
};
</script>