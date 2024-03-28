<template>
  <div id="app">
    <index />
  </div>
</template>

<script>
import HelloWorld from './views/HelloWorld.vue'
import index from './views/index.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    index
  }
}
</script>

<style>
</style>
