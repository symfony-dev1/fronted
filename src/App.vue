<template>
  <div>
    <Header />
  </div>
  <router-view></router-view>
  <Loader />
  <div>
    <Footer />
  </div>
</template>
<script setup>
import Header from "./Pages/Layouts/Header.vue";
import Footer from "./Pages/Layouts/Footer.vue";
import Loader from "./Components/Loader.vue";
</script>
