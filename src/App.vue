<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  created () {
    document.title = "MOVIE MEMORIES";
  }
};
</script>

<style>
#app {
  font-family: "Sansation", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@font-face {
  font-family: "Sansation";
  src: local("Sansation"),
   url(./assets/font/Sansation%20Bold.ttf) format("truetype");
}
</style>