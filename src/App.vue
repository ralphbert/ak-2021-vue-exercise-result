<template>
  <div id="app" class="container mt-4">
    <ul class="nav mb-5">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/todos">Todos</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/webcam">Webcam</router-link>
      </li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>
