<template>
  <div id="app">
    <router-view v-if="isShow"></router-view>
  </div>
</template>

<script>
import Home from './views/Main.vue'
export default {
  components: {
    Home
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isShow: true
    }
  },
  methods: {
    reload() {
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      })
    }
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