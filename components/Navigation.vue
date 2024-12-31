<script setup>
import { onMounted, ref } from 'vue';
// import { sendIPCRequest } from '../utils/helpers';

const wide = ref(null);
const widen = ref(false);
// const userData = ref({});
const icons = ref([
  {
    name: 'fb-logo',
    href: '',
    svg: '<img src="../assets/macys-logo.png" id="thor-image" width="30" height="24">'
  },
  {
    name: 'home',
    href: '/',
    svg: '<svg ref="svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home" id="home-path"><path class="path" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline class="polyline" points="9 22 9 12 15 12 15 22"></polyline></svg>'
  },
  {
    name: 'applications',
    href: '',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>'
  },
  {
    name: 'settings',
    href: '',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>'
  }
]);
//TODO: move this into its own file
const departments = ref([
  {
    name: 'Pages',
    subMenuVisible: false,
    element: null,
    apps: [
      {
        title: 'Slotting',
        href: '/slotting'
      },
      {
        title: 'Sample Page',
        href: '/sample'
      },
    ]
  },
  // {
  //   name: 'Ecom',
  //   subMenuVisible: false,
  //   element: null,
  //   apps: [
  //     // {
  //     //   title: 'Proship Decode',
  //     //   href: '/Decode'
  //     // },
  //     // {
  //     //   title: 'Retail To Ecom',
  //     //   href: '/RetailToEcom'
  //     // },
  //     {
  //       title: 'PS - Shipment Cost',
  //       href: '/proshipShipmentCostHistory'
  //     },
  //     {
  //       title: 'PS Dev - Testing',
  //       href: '/RateShop'
  //     },
  //     {
  //       title: 'Package Tracking',
  //       href: '/TrackingDetails'
  //     },
  //     {
  //       title: 'Order Issue',
  //       href: '/OrderIssue'
  //     }
  //   ]
  // }
]);

// onMounted(async () => {
//   userData.value = await sendIPCRequest({ command: 'request:username' }, { command: 'response:username' });
//   console.log(userData.value);
// });

function showSubMenu(index) {
  console.log('Clicked showSubMenu', departments.value[index].subMenuVisible);

  if (departments.value[index].subMenuVisible == false) {
    departments.value[index].element.classList.add('close-arrow');
    departments.value[index].element.classList.remove('open-arrow');
    departments.value[index].subMenuVisible = true;
  } else {
    departments.value[index].element.classList.add('open-arrow');
    departments.value[index].element.classList.remove('close-arrow');
    departments.value[index].subMenuVisible = false;
  }
  // departments.value[index].subMenuVisible = !departments.value[index].subMenuVisible;
}
function makeWider() {
  if (widen.value == false) {
    wide.value.classList.add('wide');
  } else {
    wide.value.classList.remove('wide');
  }
  widen.value = !widen.value;
}
</script>

<template>
  <div id="nav">
    <div id="menu-root" class="light-box-shadow" ref="wide">
      <section id="macys-star" class="menu-bubble" @click="makeWider()">
        <div class="span-wrapper">
          <span class="menu-span" v-html="icons[0].svg"></span>
        </div>
      </section>
      <section id="home" class="menu-bubble">
        <div class="span-wrapper">
          <NuxtLink :to="icons[1].href" class="menu-anchor">
            <span class="menu-span" v-html="icons[1].svg"></span>
          </NuxtLink>
        </div>
      </section>
      <section id="applications" class="menu-bubble" @click="makeWider()">
        <div class="span-wrapper">
          <NuxtLink :to="icons[2].href">
            <span class="menu-span" v-html="icons[2].svg"></span>
          </NuxtLink>
        </div>
      </section>
      <section v-if="widen" class="menu-bubble exception-bubble drop-down-section">
        <ul class="list">
          <li class="department" v-for="(department, index) in departments" @click.self="showSubMenu(index)"
            :key="department.name">
            {{ department.name }}
            <span :ref="(el) => {
              department.element = el;
            }
              " class="arrow open-arrow">&#8249;</span>
            <ul class="submenu" :class="{ hidden: !department.subMenuVisible }">
              <li v-for="app in department.apps" :key="app.title" class="submenu-li">
                <NuxtLink :to="app.href" @click="makeWider()">{{ app.title }}</NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <section id="settings" class="menu-bubble">
        <div class="span-wrapper">
          <NuxtLink class="link" :to="icons[3].href">
            <span class="menu-span" v-html="icons[3].svg"></span>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
@font-face{
  font-family: 'Leelawad';
  src: url('../font/leelawad.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
* {
  font-family: 'Leelawad', sans-serif;
}

/* Base styles */
.submenu {
  overflow: hidden;
}

/* Transitioning height and opacity */
/* .submenu-transition-enter-active,
.submenu-transition-leave-active {
  transition: height 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
}

.submenu-transition-enter-from,
.submenu-transition-leave-to {
  height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.submenu-transition-enter-to,
.submenu-transition-leave-from {
  height: auto;
  opacity: 1;
  transform: translateY(0);
} */

.span-wrapper {
  /* padding: 10px; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.wide {
  width: 200px !important;
}

.arrow {
  position: absolute;
  padding-left: 2.5px;
  padding-top: 5px;
  transition: 0.3s;
}

.open-arrow {
  transform: rotate(270deg);
}

.close-arrow {
  transform: rotate(90deg);
}

.span-wrapper:hover {
  border-radius: 15%;
  background-color: #ff002f31;
  cursor: pointer;
}

#menu-root:hover {
  width: 65px;
}

.submenu-li:hover {
  background-color: #ff002f31;
  border-radius: 4px;
}

#thor-image {
  border-radius: 50%;
}

#menu-root {
  background-color: #ffffff;
  position: fixed;
  width: 60px;
  height: 100%;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-right: 1px solid #d6d6d6;
  transition: all 0.3s;
  /* box-shadow: 1px 4px 7px -2px rgba(0, 0, 0, 0.18); */
}

#macys-star {
  margin-bottom: 20px;
  margin-top: 20px;
}

.list {
  height: 200px;
  width: 100%;
  background-color: #f1f1f1;
  list-style: none;
  /* padding: 5px; */
  overflow: auto;
}

li:hover {
  cursor: pointer;
  background-color: #ff002f31;
}

li {
  padding: 10px;
  display: inline-block;
}

li::marker {
  color: darkgray;
  padding: 0;
  margin: 0;
}

a {
  display: inline-block;
  color: #353535;
  text-decoration: none;
}

.department {
  width: 100%;
  /* background-color: #f1f1f1; */
  display: inline-block;
  padding: 10px;
  position: relative;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
}

.menu-bubble {
  text-align: center;
  background-color: #ffffff;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  margin: 5px;
}

.exception-bubble {
  height: auto;
  width: 100%;
}

.hidden {
  height: 0 !important;
  opacity: 0 !important;
  position: absolute;
  pointer-events: none;
}

.submenu {
  list-style: circle;
  transition: all 0.3s;
  display: block;
  font-weight: normal !important;
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* font-size: 12px; */
}

.submenu:target {
  height: auto;
}

.menu-anchor {
  width: 100%;
  text-decoration: none;
}

.menu-span {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>