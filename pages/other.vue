<script setup>
import { ref, computed } from 'vue';
import Page from '../components/Page.vue';
const pages = ref([{ name: 'Other Page', id: 'otherPage' }]);
const appName = ref('Other Page');
</script>

<template>
  <Page :title="appName" :pages="pages">
    <template #otherPageParams class="page">
      <p class="apps">Other pages....</p>
      <NuxtLink to="/template">Template</NuxtLink>
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