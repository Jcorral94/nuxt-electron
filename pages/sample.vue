<script setup>
import { ref, computed } from 'vue';
import Page from '../components/Page.vue';
import { sendIPCRequest } from '../js/utils';
const pages = ref([{ name: 'Page 1', id: 'samplePage1' },{ name: 'Page 2', id: 'samplePage2' }]);
const appName = ref('Sample Page');
const data = ref('');
const error = ref('');
async function send(){
  const send = { command: 'ping', params: ''};
  const response = { command: 'response:pong' };
  try {
    data.value = await sendIPCRequest(send, response);
  } catch(error){
    error.value = error;
  }
}
</script>

<template>
  <Page :title="appName" :pages="pages">
    <template #samplePage1Params class="page">
      <div>
        <!-- <div class="text-center">Sample Page</div> -->
        <button @click="send" class="bg-black transition duration-150 hover:duration-150 ease-in-out p-1 rounded hover:bg-zinc-700 text-white">Button 1</button>
        <div v-if="data">
          {{ data }}
        </div>
      </div>
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