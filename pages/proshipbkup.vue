<script setup>
// import { render } from 'nuxt/dist/app/compat/capi';
import 'datatables.net';

const route = useRoute();
const state = reactive({
  loading: false,
  data: [],
  error: null,
});
const headers = computed(() => {
  return Object.keys(state.data[0]);
});
const path = process.env.API_URL;

onMounted(async () => {
  await get();
  // render();
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
    <div class="flex flex-col">
      <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <div class="inline-block max-h-80 h-full align-center">
          <div class="overflow-hidden">
            <table
              id="proship-table"
              v-if="state.data.length > 0"
              class="min-w-full divide-y divide-gray-100 table-fixed dark:divide-gray-700"
            >
              <thead class="bg-gray-100 dark:bg-gray-700">
                <tr v-if="headers.length > 0">
                  <th
                    scope="col"
                    class="py-1 px-3 text-xs font-large tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                    v-for="header in headers"
                  >
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody
                class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
              >
                <tr
                  v-for="row in state.data"
                  class="hover:bg-light dark:hover:bg-light bg-white"
                >
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.tracking_number }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.secondary_tracking }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.ship_date }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.rated_date }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.voided }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.server_used }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.user }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.wm_olpn }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.tc_order_id }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.ship_from }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.service }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.zone }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.weight }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.billed_weight }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.dimensions }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.total }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.base_cost }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.base_net_cost }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.discount_value }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.volume_surcharge }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.accessorial_fees }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.accessorial_net_fees }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.fuel_surcharge_fee }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.fuel_surcharge_net_fee }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.residential_fee }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.residential_net_fee }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.additional_handling_fee }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.additional_handling_net_fee }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.extended_area_fee }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.extended_area_net_fee }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.oversize_fee }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.oversize_net_fee }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.saturday_delivery_fee }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.saturday_delivery_net_fee }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.commitment_time }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.ads_requested_commit_time }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.ads_carrier_commit_date }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.cleaned_record }}
                  </td>
                  <td
                    class="py-1 px-1 text-sm font-small text-gray-900 whitespace-nowrap dark:text-gray"
                  >
                    {{ row.rated_date_formatted }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
