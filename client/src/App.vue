<template>
  <section class="bg-[#1C1917] min-h-[100vh] w-[100%] px-[1rem]">
    <Header />
    <router-view />
  </section>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<style scoped></style>
