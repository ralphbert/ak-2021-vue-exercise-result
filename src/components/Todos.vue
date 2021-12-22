<template>
  <div class="todos">
    <h2>Todos</h2>

    <div class="mb-3">
      <button class="btn btn-primary" @click="load">Load</button>
    </div>

    <div class="alert alert-danger" v-if="error">
      {{ error.message }}
    </div>

    <div>
      <LoadingIndicator v-if="loading">Loading...</LoadingIndicator>
      <ul class="list-group">
        <li class="list-group-item" v-for="todo in todos" :key="todo.id">
          {{ todo.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import LoadingIndicator from "./LoadingIndicator";

export default {
  components: {LoadingIndicator},
  data() {
    return {
      todos: [],
      loading: false,
      error: null,
      serverURL: 'https://jsonplaceholder.typicode.com/todos',
    }
  },
  methods: {
    load() {
      this.loading = true;
      this.error = null;

      axios.get(this.serverURL)
          .then((response) => {
            this.todos = response.data;
          })
          .catch(error => {
            this.error = error;
          })
          // finally will be called every time when a promise settles
          .finally(() => {
            this.loading = false;
          });
    }
  },
}
</script>
