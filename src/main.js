import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import HelloWorld from "./components/HelloWorld";
import Webcam from "./components/Webcam";
import Todos from "./components/Todos";

Vue.use(VueRouter);

Vue.config.productionTip = false

const routes = [{
  path: '/',
  component: HelloWorld,
}, {
  path: '/webcam',
  component: Webcam,
}, {
  path: '/todos',
  component: Todos,
}];

const router = new VueRouter({
  routes: routes,
});

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
