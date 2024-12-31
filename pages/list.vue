<script setup>
import { ref, reactive, computed } from 'vue';
import Page from '../components/Page.vue';
import ListHover from '../components/ListHover.vue';
const pages = ref([{ name: 'List Sample Page', id: 'listSamplePage' }]);
const appName = ref('List Sample Page');


const table = ref([{
  item: Date.now() + "",
  location: 'AA01-A-203',
  showItemDetails: false,
  showLocationDetails: false,
}, {
  item: Date.now() + 1 + "",
  location: 'AA01-A-204',
  showItemDetails: false,
  showLocationDetails: false,
}]);


const optionsItems = [{ text: 'User Actvity', run: (item) => console.log('Run item:', item)}, { text: 'Work Log Details', run: (item) => console.log('Run item:', item) }, { text: 'Cycle Count', run: (item) => console.log('Run item:', item) }];
const optionsLocation = [{ text: 'Location Look up', run: (item) => console.log('Run item:', item)}];

function showHideItemDetails({ data, show }) {
  data.showItemDetails = show;
}

function showHideLocationDetails({ data, show }){
  data.showLocationDetails = show;
}

</script>

<template>
  <Page :title="appName" :pages="pages">
    <template #listSamplePageParams class="page">
      <section>
        <!-- create the simple table -->
        <table>
          <thead>
            <tr>
              <th>item</th>
              <th>location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="value in table" :key="value.item">
              <!-- <template> -->
              <td>
                <div @mouseenter="showHideItemDetails({ data: value, show: true })"
                  :class="{ bold: value.showItemDetails }"
                  @mouseleave="showHideItemDetails({ data: value, show: false })">
                  {{ value.item }} - {{ value.showItemDetails }}
                  <!-- show search options table when hovering -->
                  <ListHover v-if="value.showItemDetails" class="list-hover" :item="value.item"
                    :search-options="optionsItems"></ListHover>
                </div>
              </td>
              <td>
                <div @mouseenter="showHideLocationDetails({ data: value, show: true })"
                  :class="{ bold: value.showLocationDetails }"
                  @mouseleave="showHideLocationDetails({ data: value, show: false })">
                  {{ value.location }} - {{ value.showLocationDetails }}
                  <!-- show search options table when hovering -->
                  <ListHover v-if="value.showLocationDetails" class="list-hover" :item="value.item"
                    :search-options="optionsLocation"></ListHover>
                </div>
              </td>
              <!-- </template> -->
            </tr>
          </tbody>
        </table>
        <!-- Add the hover to the td -->
      </section>
    </template>
  </Page>
</template>

<style>
.bold{
  font-weight: bold;
}
.page {
  background-color: white;
}

body {
  background-color: #f4f2f2;
}

td {
  position: relative;
}
</style>