<template>
  <button @click="authStore.handleLogout" type="button" class="btn btn-warning me-2">
    Logout
  </button>
</template>
<script setup>
import { useAuthStore } from "../Stores/auth.js";

const authStore = useAuthStore();
</script>
