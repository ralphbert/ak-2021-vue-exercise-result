<template>
  <div class="row align-items-center">
    <div class="col-auto">
      <Spinner></Spinner>
    </div>
    <div class="col">
      <!-- using the slot-tag to project the content between the tags to this position -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Spinner from "./Spinner";
export default {
  name: "LoadingIndicator",
  components: {
    Spinner
  }
}
</script>

<style scoped>

</style>
