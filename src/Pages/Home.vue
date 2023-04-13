<template>
  <h2 class="d-flex justify-content-center p-4 m-4">Welcome to Our Site!!!</h2>
</template>
<script setup>
import { onBeforeMount, onMounted } from "vue";
import { useAuthStore } from "../Stores/auth";
const authStore = useAuthStore();
onMounted(async () => {
  await authStore.getCartGlobalCount();
});
</script>
