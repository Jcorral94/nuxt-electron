<script setup>
import { ref, computed } from 'vue';
import Page from '../components/Page.vue';
const pages = ref([{ name: 'Home Page', id: 'homePage' }]);
const appName = ref('Home Page');
</script>

<template>
  <Page :title="appName" :pages="pages">
    <template #homePageParams class="page">
      <p class="apps">pages....</p>
      <NuxtLink to="/sample">Template</NuxtLink>
    </template>
  </Page>
</template>

<style>
.page{
  background-color: white;
}
body {
  background-color: #f4f2f2;
}
</style>