<script setup>
import Page from "../components/Page.vue";
const pages = ref([{ name: 'Home Page', id: 'home' }]);
const appName = ref('Home page');
const route = useRoute();
</script>

<template>
  <Page :pages="pages" :title="appName">
    <template #homeParams>
      <div class="w-full text-center">
        <div class="italic block">Current route: {{ route.path }}</div>
        <div class="links">
          <NuxtLink to="/random" class="link">
            Go-to Random page
          </NuxtLink>
          <NuxtLink to="/snow" class="link">
            Go to Snow
          </NuxtLink>
          <NuxtLink to="/proship" class="link">
            Proship
          </NuxtLink>
          <NuxtLink to="/list" class="link">
            List
          </NuxtLink>
        </div>
      </div>
    </template>
  </Page>
</template>

<style scoped>
.links {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.link {
  background-color: rgb(197, 197, 197);
  padding: 5px;
  border-radius: 5px;
  margin: 5px;
}
</style>
