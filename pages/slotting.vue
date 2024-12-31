<script setup>
import { ref, computed, nextTick } from 'vue';
import Page from '../components/Page.vue';
import { getIntransit } from '../js/api/intransit';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

const pages = ref([{ name: 'Slotting Intransit Items', id: 'intransit' }]);
const appName = ref('Sample Page');
const maxLocations = ref(4);
const intransit = ref([]);

const headerLookup = {
  item: 'Item',
  activeLocations: 'Active Locations',
  largestQty: 'Largest Case Quantity',
  totalUnits: 'Total Intransit Units',
  unitVolume: 'Unit Volume',
  storageType: 'Storage Type',
  cartons: 'Cartons',
  cumulativeVolume: 'Cumulatvie Volume'
};
const headers = computed(() => {
  return intransit.value.length > 0 ? Object.keys(intransit.value[0]).map(header => headerLookup[header] || header) : [];
});


async function fetchIntransit() {
  const rawData = (await getIntransit()).filter(item => item.PROD_LINE === 'CSR' && +item.UNIT_VOLUME > 0);
  const groupedData = rawData.reduce((acc, val) => {
    if (!acc[val.ITEM_NAME]) {
      acc[val.ITEM_NAME] = {
        item: val.ITEM_NAME,
        activeLocations: +val.ACTIVE_LOCNS,
        largestQty: 0,
        totalUnits: 0,
        unitVolume: +val.UNIT_VOLUME,
        storageType: val.PROD_LINE,
        cartons: [],
      };
    }

    const largest = Math.max(+val.SIZE_VALUE, +val.RSV_LARGEST_CASE_QTY);
    if (largest > acc[val.ITEM_NAME].largestQty) {
      acc[val.ITEM_NAME].largestQty = largest;
    }
    acc[val.ITEM_NAME].totalUnits += (+val.SIZE_VALUE);
    acc[val.ITEM_NAME].cartons.push(val);

    return acc;
  }, {});

  intransit.value = Object.values(groupedData).map(data => {
    data.cumulativeVolume = data.totalUnits * data.unitVolume;
    return data;
  });

  console.log(intransit.value);
  // Wait for DOM update before initializing DataTables
  await nextTick();

  new DataTable('#transit-table', {
    responsive: true,
    dom: 'Bfrtip', // Enable buttons like export
    buttons: ['csv'],
  });
}
</script>

<template>
  <Page :title="appName" :pages="pages">
    <template #intransitParams class="page">
      <div class="">
        <button @click="fetchIntransit"
          class="bg-black transition duration-150 hover:duration-150 ease-in-out p-1 rounded hover:bg-zinc-700 text-white">
          Refresh
        </button>
      </div>
      <div class="inputs">
        <label for="maxLocations">
          <span>Max Locations: </span>
          <input type="text" id="maxLocations" v-model="maxLocations" />
        </label>
      </div>
      <table id="transit-table" v-if="intransit.length > 0" class="display nowrap dataTable dtr-inline collapsed max-w-50">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in intransit" :key="row.item">
            <td>{{ row.item }}</td>
            <td>{{ row.activeLocations }}</td>
            <td>{{ row.largestQty }}</td>
            <td>{{ row.totalUnits }}</td>
            <td>{{ row.unitVolume }}</td>
            <td>{{ row.storageType }}</td>
            <td>{{ row.cartons.length }}</td>
            <td>{{ row.cumulativeVolume }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </Page>
</template>

<style>
.page {
  background-color: white;
}

body {
  background-color: #f4f2f2;
}

.inputs {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
}

#maxLocations {
  text-align: center;
  width: 40px;
  border: 1px solid #171717;
  border-radius: 5px;
}
</style>
