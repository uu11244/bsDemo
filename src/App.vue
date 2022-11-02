<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './components/Home.vue'
export default {
  components: {
    Home
  }

}
</script>

<style>
html,
body,
#app {
  padding: 0;
  margin: 0;
  height: 100%;
}
</style>>