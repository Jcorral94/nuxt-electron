<script setup>
import { ref, onMounted, defineProps } from 'vue';

const active = ref(null);

onMounted(() => {
  pages.children[0].click();
});

defineProps({
  title: String,
  pages: Array
});

function updateActive(name) {
  active.value = name;
}
</script>

<template>
  <div id="body-root">
    <div id="nav-header">
      <div ref="title">
        {{ title }}
      </div>
    </div>
    <div id="pages" class="light-box-shadow">
      <div :key="p.name" :id="p.name" class="tab" v-for="p in pages" @click="updateActive(p.name)"
        :class="{ activeTab: active == p.name }">
        {{ p.name }}
      </div>
    </div>

    <!-- Transition group for the module sections -->
    <transition-group name="fade" tag="div" class="module-container">
      <div :key="p.id" :id="p.id + '_module'" v-for="p in pages" class="module" v-show="p.name === active">
        <slot :name="p.id + 'Params'"></slot>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'Leelawad';
  src: url('../font/leelawad.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

* {
  padding: 0;
  margin: 0;
  color: rgb(71, 70, 70);
  transition: all 0.2s;
  font-family: 'leelawad';
}

.username {
  font-size: 10px !important;
  text-align: right;
  font-style: italic;
}

.page {
  padding: 10px;
  border: 1px solid rgb(150, 150, 150, 1);
}

.page > a {
  text-decoration: none;
}

#nav-header {
  background-color: #ffffff;
  padding: 10px;
  color: #CC0000;
  display: flex;
  align-items: flex-end;
  border-bottom: 1px solid #d6d6d6;
}

.module {
  margin: 5px !important;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  /* position: absolute; */
  position: relative;
  /* width: 100%; */
}

.module-container {
  /* position: absolute; */
  position: relative;
}

#nav-header div {
  width: 100%;
  font-size: 25px;
  font-weight: bold;
}

#body-root {
  width: calc(100% - 60px);
  height: 100%;
  display: flex;
  margin-left: 60px;
  flex-direction: column;
  /* position: relative; */
}

#pages {
  background-color: #ffffff;
  color: #CC0000;
  display: flex;
  justify-content: left;
  flex-direction: row;
}

.tab {
  height: 100%;
  padding: 10px;
  color: rgb(0, 0, 0);
  font-size: 13px;
  transition: background-color 0.3s;
}

.tab:hover {
  background-color: #fb7c7c;
  cursor: pointer;
}

.hidden {
  display: none;
}

.activeTab {
  background-color: #f69393;
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out , transform 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95); /* Optional: Adds a slight zoom effect */
}
</style>
