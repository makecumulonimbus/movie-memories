<template>
  <div id="main-view">
    <Navbar />
    <div class="row justify-content-center" >
      <div class="col-12 col-xl-11">
      <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";

export default {
  name: "main",
  components: {
    Navbar,
  },
};
</script>
