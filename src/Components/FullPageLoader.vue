<template>
  <div class="full-page-loader" v-if="loading">
    <div class="loader"></div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "FullPageLoader",
  setup() {
    const loading = ref(false);

    // Show the loader when loading is true
    const startLoading = () => {
      loading.value = true;
    };

    // Hide the loader when loading is false
    const stopLoading = () => {
      loading.value = false;
    };

    return {
      loading,
      startLoading,
      stopLoading,
    };
  },
});
</script>

<style scoped>
.full-page-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
