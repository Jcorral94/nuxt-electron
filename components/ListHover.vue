<script setup>
import { ref, onMounted, defineProps } from 'vue';

defineProps({
  item: {
    require: true,
    type: String,
  },
  searchOptions: {
    require: true,
    type: Array,
  }
});

</script>

<template>
  <div class="hoverList">
    <div class="container" v-for="option in searchOptions">
      <span>
        <button @click="option.run(item)">
          {{ option.text }}
        </button>
      </span>
    </div>
  </div>
</template>

<style scoped>
.container{
  padding: 5px;
  border-bottom: 1px solid rgb(208, 207, 207);
  width: 200px;
}
span, button{
  width: 100%;
}
.hoverList{
  padding: 10px;
  position: absolute;
  background-color: antiquewhite;
  top: 70%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
