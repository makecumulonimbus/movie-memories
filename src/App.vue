<template>
  <perfect-scrollbar>
    <div id="app">
      <router-view />
    </div>
  </perfect-scrollbar>
</template>

<script>
export default {
  name: "Apps",
  created() {
    document.title = "MOVIE MEMORIES";
  },
};
</script>

<style>
#app {
  font-family: "Sansation", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

@font-face {
  font-family: "Sansation";
  src: local("Sansation"),
    url(./assets/font/Sansation%20Bold.ttf) format("truetype");
}
</style>
