<script setup>
import { ipcRenderer } from 'electron';
const route = useRoute();
console.log(ipcRenderer);
</script>

<template>
  <div>
    Random Page
    {{ route.fullPath }}
    <NuxtLink to="/">Home Page</NuxtLink>
  </div>
</template>