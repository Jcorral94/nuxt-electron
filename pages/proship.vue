<script setup>
import Page from '../components/Page.vue';
// import { render } from 'nuxt/dist/app/compat/capi';
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/jquery.dataTables.min.css";
// import 'datatables.net-responsive-dt';


const pages = ref([{ name: 'Proship', id: 'proship' }]);
const appName = ref('Proship');
const columnLookup = {
  tracking_number: 'Tracking Number',
  secondary_tracking: 'Secondary Tracking',
  ship_date: 'Ship Date'
};

const route = useRoute();
const state = reactive({
  loading: false,
  data: [],
  error: null,
});
const table = ref(null);
const headers = computed(() => {
  return Object.keys(state.data[0]).map(h=>({data:h}));
  // return Object.keys(state.data[0]).map(header => columnLookup[header] || header).map(h => ({data: h}));
});
const path = process.env.API_URL;

onMounted(async () => {
  await get();
  initializeTable();
});

async function get() {
  state.loading = true;
  try {
    const response = await fetch(path);

    if (response.ok) {
      // console.log(response.ok);
      const { rows } = await response.json();
      state.data = [...rows].map(row => ({
        ...row,
        zz_editable: false
      }));
      console.log(state.data);
    } else {
      const error = new Error();
      error.message = "Response is not ok.";
    }
  } catch (error) {
    state.error = error;
  } finally {
    state.loading = false;
  }
}

function toggleEdit(index) {
  if(table.value && state.data[index].zz_editable == true){
    table.value.clear().rows.add(...state.data).draw();
  }
  state.data[index].zz_editable = !state.data[index].zz_editable;

}

// watch(() => state.data, () => {
//   console.log('Running watch');
//   if (table.value) {
//     table.value.clear();
//     table.value.rows.add(state.data);
//     table.value.draw();
//   }
// }, {deep: true});

function initializeTable() {
  console.log(headers.value, state.data);
  // table.value = new DataTable("#proship-table", {
  //   columns: headers.value,
  //   responsive: true,
  //   layout: {
  //     topStart: {
  //       buttons: ['csv']
  //     }
  //   }
  // });
}

</script>
<template>
  <Page :pages="pages" :title="appName">
    <template #proshipParams>
      <div id="wrapper" class="max-w-50 px-1 py-4 overflow-auto">
        <!-- class="display nowrap dataTable dtr-inline collapsed max-w-50" -->
        <table id="proship-table"
          v-if="state.data.length > 0">
          <thead>
            <tr v-if="headers.length > 0">
              <th v-for="header in headers">
                {{ header.data }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(row, index) in state.data" :key="row.tracking_number">
              <tr v-if="!row.zz_editable">
                <td>
                  {{ row.tracking_number }}
                </td>
                <td>
                  {{ row.secondary_tracking }}
                </td>
                <td>
                  {{ row.ship_date }}
                </td>
                <td>
                  {{ row.rated_date }}
                </td>
                <td>
                  {{ row.voided }}
                </td>
                <td>
                  {{ row.server_used }}
                </td>
                <td>
                  {{ row.user }}
                </td>
                <td>
                  {{ row.wm_olpn }}
                </td>
                <td>
                  {{ row.tc_order_id }}
                </td>
                <td>
                  {{ row.ship_from }}
                </td>
                <td>
                  {{ row.service }}
                </td>
                <td>
                  {{ row.zone }}
                </td>
                <td>
                  {{ row.weight }}
                </td>
                <td>
                  {{ row.billed_weight }}
                </td>
                <td>
                  {{ row.dimensions }}
                </td>
                <td>
                  {{ row.total }}
                </td>
                <td>
                  {{ row.base_cost }}
                </td>
                <td>
                  {{ row.base_net_cost }}
                </td>
                <td>
                  {{ row.discount_value }}
                </td>
                <td>
                  {{ row.volume_surcharge }}
                </td>
                <td>
                  {{ row.accessorial_fees }}
                </td>
                <td>
                  {{ row.accessorial_net_fees }}
                </td>
                <td>
                  {{ row.fuel_surcharge_fee }}
                </td>
                <td>
                  {{ row.fuel_surcharge_net_fee }}
                </td>
                <td>
                  {{ row.residential_fee }}
                </td>
                <td>
                  {{ row.residential_net_fee }}
                </td>
                <td>
                  {{ row.additional_handling_fee }}
                </td>
                <td>
                  {{ row.additional_handling_net_fee }}
                </td>
                <td>
                  {{ row.extended_area_fee }}
                </td>
                <td>
                  {{ row.extended_area_net_fee }}
                </td>
                <td>
                  {{ row.oversize_fee }}
                </td>
                <td>
                  {{ row.oversize_net_fee }}
                </td>
                <td>
                  {{ row.saturday_delivery_fee }}
                </td>
                <td>
                  {{ row.saturday_delivery_net_fee }}
                </td>
                <td>
                  {{ row.commitment_time }}
                </td>
                <td>
                  {{ row.ads_requested_commit_time }}
                </td>
                <td>
                  {{ row.ads_carrier_commit_date }}
                </td>
                <td>
                  {{ row.cleaned_record }}
                </td>
                <td>
                  {{ row.rated_date_formatted }}
                </td>
                <td>
                  {{ row.replicated }}
                </td>
                <td>
                  <button @click="toggleEdit(index)">Edit</button>
                </td>
              </tr>
              <tr v-else>
                <td>
                  <input type="text" v-model="row.tracking_number">
                </td>
                <td>
                  <input type="text" v-model="row.secondary_tracking" />
                </td>
                <td>
                  <input type="text" v-model="row.ship_date" />
                </td>
                <td>
                  <input type="text" v-model="row.rated_date" />
                </td>
                <td>
                  <input type="text" v-model="row.voided" />
                </td>
                <td>
                  <input type="text" v-model="row.server_used" />
                </td>
                <td>
                  <input type="text" v-model="row.user" />
                </td>
                <td>
                  <input type="text" v-model="row.wm_olpn" />
                </td>
                <td>
                  <input type="text" v-model="row.tc_order_id" />
                </td>
                <td>
                  <input type="text" v-model="row.ship_from" />
                </td>
                <td>
                  <input type="text" v-model="row.service" />
                </td>
                <td>
                  <input type="text" v-model="row.zone" />
                </td>
                <td>
                  <input type="text" v-model="row.weight" />
                </td>
                <td>
                  <input type="text" v-model="row.billed_weight" />
                </td>
                <td>
                  <input type="text" v-model="row.dimensions" />
                </td>
                <td>
                  <input type="text" v-model="row.total" />
                </td>
                <td>
                  <input type="text" v-model="row.base_cost" />
                </td>
                <td>
                  <input type="text" v-model="row.base_net_cost" />
                </td>
                <td>
                  <input type="text" v-model="row.discount_value" />
                </td>
                <td>
                  <input type="text" v-model="row.volume_surcharge" />
                </td>
                <td>
                  <input type="text" v-model="row.accessorial_fees" />
                </td>
                <td>
                  <input type="text" v-model="row.accessorial_net_fees" />
                </td>
                <td>
                  <input type="text" v-model="row.fuel_surcharge_fee" />
                </td>
                <td>
                  <input type="text" v-model="row.fuel_surcharge_net_fee" />
                </td>
                <td>
                  <input type="text" v-model="row.residential_fee" />
                </td>
                <td>
                  <input type="text" v-model="row.residential_net_fee" />
                </td>
                <td>
                  <input type="text" v-model="row.additional_handling_fee" />
                </td>
                <td>
                  <input type="text" v-model="row.additional_handling_net_fee" />
                </td>
                <td>
                  <input type="text" v-model="row.extended_area_fee" />
                </td>
                <td>
                  <input type="text" v-model="row.extended_area_net_fee" />
                </td>
                <td>
                  <input type="text" v-model="row.oversize_fee" />
                </td>
                <td>
                  <input type="text" v-model="row.oversize_net_fee" />
                </td>
                <td>
                  <input type="text" v-model="row.saturday_delivery_fee" />
                </td>
                <td>
                  <input type="text" v-model="row.saturday_delivery_net_fee" />
                </td>
                <td>
                  <input type="text" v-model="row.commitment_time" />
                </td>
                <td>
                  <input type="text" v-model="row.ads_requested_commit_time" />
                </td>
                <td>
                  <input type="text" v-model="row.ads_carrier_commit_date" />
                </td>
                <td>
                  <input type="text" v-model="row.cleaned_record" />
                </td>
                <td>
                  <input type="text" v-model="row.rated_date_formatted" />
                </td>
                <td>
                  <input type="text" v-model="row.replicated" />
                </td>
                <td>
                  <button @click="toggleEdit(index)">Edit</button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </template>
  </Page>
</template>
<style>
#wrapper {
  font: 0.7rem "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif !important;
  background-color: white;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
}

table tr, td {
  white-space: nowrap;
  padding: 10px 5px;
  text-align: center;
}
table tr:nth-child(even) {
  background-color: #f2f2f2; /* Light gray color for even columns */
}

input[type="text"] {
  border: 1px solid black;
  border-radius: 5px;
}

body {
  background-color: #f1f1f1;
}
</style>
