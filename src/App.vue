<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

import autofit from 'autofit.js'
export default {
  name: 'App',
  mounted(){
    /* autofit.init({
        designHeight: 1080,
        designWidth: 1920,
        renderDom:"#app",
        resize: true
    }) */
  }
}
</script>

<style>
</style>
