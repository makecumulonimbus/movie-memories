<template>
  <div class="loading-icon">
    <div>
      <img src="../assets/logo.png" alt="" class="img-icon" />
      <p class="pt-4 load-text">LOADING</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingPage",
};
</script>

<style scoped>
.loading-icon {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.6);
}

.loading-icon .img-icon {
  width: 80px;
  height: 80px;
  animation-name: spin;
  animation-duration: 900ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.load-text {
  color: #fff;
  font-size: 20px;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>