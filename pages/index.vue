<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <NuxtLink to="/random">
      Go-to Random page
    </NuxtLink>
    <br>
    <NuxtLink to="/snow">
      Go to Snow
    </NuxtLink>
    <NuxtLink to="/proship">
      Proship
    </NuxtLink>
    <br>
    <br>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
  </div>
</template>
