<script setup>
// import { render } from 'nuxt/dist/app/compat/capi';
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/jquery.dataTables.min.css";
// import 'datatables.net-responsive-dt';

const route = useRoute();
const state = reactive({
  loading: false,
  data: [],
  error: null,
});
const table = ref(null);
const headers = computed(() => {
  return Object.keys(state.data[0]);
});
const path = process.env.API_URL;

onMounted(async () => {
  await get();
  // render();

  let table = new DataTable("#proship-table", {
    responsive: true,
  });
});
async function get() {
  state.loading = true;
  try {
    const response = await fetch(path);

    if (response.ok) {
      // console.log(response.ok);
      const { rows } = await response.json();
      state.data = [...rows];
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
</script>
<template>
  <header>
    <h1 class="mb-6 text-5xl font-bold">Proship Table</h1>
  </header>
  <div>
    <div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis
        neque, consequuntur explicabo illo nostrum, vel sit beatae fuga tenetur
        velit sed, adipisci id? Cum animi laboriosam eligendi delectus repellat
        molestiae.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam quo,
        illo magni temporibus ipsa dolor dicta nam, quia iure rem cupiditate
        voluptatum? Alias voluptatem vel aperiam iure consectetur neque ab.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur
        doloremque culpa nihil ducimus expedita nemo excepturi iste nulla
        consequuntur! Fugiat inventore dolorem error nobis numquam, repellendus
        ad dolores molestiae est?
      </p>
    </div>
    <div id="wrapper" class="max-w-50 px-1 py-4 overflow-scroll">
      <table
        id="proship-table"
        ref="table"
        class="display nowrap dataTable dtr-inline collapsed dark"
        v-if="state.data.length > 0"
      >
        <thead>
          <tr v-if="headers.length > 0">
            <th v-for="header in headers">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in state.data">
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
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style>
#wrapper {
  font: 0.7rem "Helvetica Neue",HelveticaNeue,Helvetica,Arial,sans-serif !important;
  background-color: white;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  padding: 10px;
}
body{
  background-color: #f1f1f1;
}
</style>
