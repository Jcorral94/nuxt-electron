<script setup>
import { ref, computed } from 'vue';
import Page from '../components/Page.vue';
const lookups = {
  '20100506':{shift:'4x10a', department:'Receiving', building: 'Goodyear'},
'20400506':{shift:'4x10a', department:'Prep', building: 'Goodyear'},
'20500506':{shift:'4x10a', department:'Returns', building: 'Goodyear'},
'22300506':{shift:'4x10a', department:'Replen (MHE)', building: 'Goodyear'},
'22200506':{shift:'4x10a', department:'MSL', building: 'Goodyear'},
'22500506':{shift:'4x10a', department:'Bulk (MHE)', building: 'Goodyear'},
'21000506':{shift:'4x10a', department:'Beauty', building: 'Goodyear'},
'22000506':{shift:'4x10a', department:'Pick', building: 'Goodyear'},
'23000506':{shift:'4x10a', department:'Pack', building: 'Goodyear'},
'24000506':{shift:'4x10a', department:'Exceptions', building: 'Goodyear'},
'24100506':{shift:'4x10a', department:'Shipping', building: 'Goodyear'},
'25000506':{shift:'4x10a', department:'Induct/Slotting/Wave Planner', building: 'Goodyear'},
'20000506':{shift:'4x10a', department:'ARO Clerical', building: 'Goodyear'},
'26000506':{shift:'4x10a', department:'DTM', building: 'Goodyear'},
'25300506':{shift:'4x10a', department:'RTV', building: 'Goodyear'},
'24200506':{shift:'4x10a', department:'ICQA', building: 'Goodyear'},
'20120506':{shift:'4x10b', department:'Receiving', building: 'Goodyear'},
'20420506':{shift:'4x10b', department:'Prep', building: 'Goodyear'},
'20520506':{shift:'4x10b', department:'Returns', building: 'Goodyear'},
'22220506':{shift:'4x10b', department:'MSL', building: 'Goodyear'},
'22320506':{shift:'4x10b', department:'Replen (MHE)', building: 'Goodyear'},
'22520506':{shift:'4x10b', department:'Bulk (MHE)', building: 'Goodyear'},
'21020506':{shift:'4x10b', department:'Beauty', building: 'Goodyear'},
'22020506':{shift:'4x10b', department:'Pick', building: 'Goodyear'},
'23020506':{shift:'4x10b', department:'Pack', building: 'Goodyear'},
'24020506':{shift:'4x10b', department:'Exceptions', building: 'Goodyear'},
'24120506':{shift:'4x10b', department:'Shipping', building: 'Goodyear'},
'25020506':{shift:'4x10b', department:'Induct', building: 'Goodyear'},
'20010506':{shift:'4x10b', department:'ARO Clerical', building: 'Goodyear'},
'24220506':{shift:'4x10b', department:'ICQA', building: 'Goodyear'},
'20110506':{shift:'3x12a', department:'Receiving', building: 'Goodyear'},
'20410506':{shift:'3x12a', department:'Prep', building: 'Goodyear'},
'20510506':{shift:'3x12a', department:'Returns', building: 'Goodyear'},
'22210506':{shift:'3x12a', department:'MSL', building: 'Goodyear'},
'22310506':{shift:'3x12a', department:'Replen (MHE)', building: 'Goodyear'},
'22510506':{shift:'3x12a', department:'Bulk (MHE)', building: 'Goodyear'},
'21010506':{shift:'3x12a', department:'Beauty', building: 'Goodyear'},
'22010506':{shift:'3x12a', department:'Pick', building: 'Goodyear'},
'23010506':{shift:'3x12a', department:'Pack', building: 'Goodyear'},
'24010506':{shift:'3x12a', department:'Exceptions', building: 'Goodyear'},
'24110506':{shift:'3x12a', department:'Shipping', building: 'Goodyear'},
'25010506':{shift:'3x12a', department:'Induct', building: 'Goodyear'},
'20040506':{shift:'3x12a', department:'ARO Clerical', building: 'Goodyear'},
'24210506':{shift:'3x12a', department:'ICQA', building: 'Goodyear'},
};
const pages = ref([{ name: 'Headcounts', id: 'headcountPage' }]);
const appName = ref('Headcounts');
const data = ref('');
const dataArray = computed(() => {
  if (!data.value) return [];
  // Week	Location	ID	EmployeeName	PositionCode	Status	Type	EmployeeGroup	JobCode	WorkSchedule	WorkArea	ScheduleArea	HomeAccount	StaffingGroup	PlanGroup	EmployeeTitle	SupervisorID	EffectiveDate	ActionDate	Action	ActionReason	HireDate
  return data.value.split('\n').map( line => line.split('\t').map(item => item.trim()) ).map(row => ({week: row[0], location: row[1], id: row[2], employeeName: row[3], positionCode: row[4], status: row[5], type: row[6], employeeGroup: row[7], jobCode: row[8], workSchedule: row[9], workArea: row[10], scheduleArea: row[11], homeAccount: row[12], staffingGroup: row[13], planGroup: row[14], employeeTitle: row[15], supervisorID: row[16], effectiveDate: row[17], actionDate: row[18], action: row[19], actionReason: row[20], hireDate: row[21], department: lookups[row[11]+row[1]?.replace('88', '0')]?.department, shift: lookups[row[11]+row[1]?.replace('88', '0')]?.shift, building: lookups[row[11]+row[1]?.replace('88', '0')]?.building}));
});

const groupByDept = computed(() => {
  if(dataArray.value.length === 0) return {};
  const grouped = {};
  dataArray.value.forEach(item => {
    if (!grouped[item.department]) {
      grouped[item.department] = [];
    }
    grouped[item.department].push(item);
  });
  return grouped;
});
</script>

<template>
  <Page :title="appName" :pages="pages">
    <template #headcountPageParams class="page">
      <div>
        <form @submit.prevent="">
          <div>
            <label for="hcfile">
              <p>Ownership Report:</p>
              <textarea name="" cols="100" rows="10" id="hcfile" v-model="data"></textarea>
            </label>
          </div>
        </form>
      </div>
      <div class="table-container">
        <table v-if="dataArray.length > 0">
          <thead>
            <tr>
              <th v-for="(key, index) in Object.keys(dataArray[0])" :key="index">{{ key }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in dataArray.slice(1)" :key="rowIndex">
              <td v-for="(value, index) in Object.values(row)" :key="index">{{ value }}</td>
            </tr>
          </tbody>
        </table>
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
textarea {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.9rem;
  box-shadow: 0 0 0 1px #ddd;
}

thead {
  background-color: #f5f5f5;
}

thead th {
  padding: 12px 8px;
  border-bottom: 2px solid #ddd;
  text-align: left;
  font-weight: bold;
  white-space: nowrap;
  position: sticky;
  top: 0;
  background: inherit;
  z-index: 1;
}

tbody tr:nth-child(even) {
  background-color: #fafafa;
}

tbody tr:hover {
  background-color: #e6f7ff;
}

td {
  padding: 10px 8px;
  border-bottom: 1px solid #eee;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 250px;
}

/* Responsive wrapper */
.table-container {
  overflow-x: auto;
  margin-top: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 100%;
}
</style>
