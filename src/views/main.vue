<template>
  <div id="main-view">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "../components/navbar.vue";
export default {
  name: "main",
  components: {
    Navbar,
  },
};
</script>

<style>
</style>