<template>
  <div id="main-view">
    <Navbar />
    <div class="desktop-breakpoint">
      <router-view />
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
