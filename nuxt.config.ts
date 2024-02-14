export default defineNuxtConfig({
  modules: ['nuxt-electron','@nuxtjs/tailwindcss'],
  router: {
    options: {
      hashMode: true
    }
  },
  electron: {
    build: [
      {
        // Main-Process entry file of the Electron App.
        entry: 'electron/main.ts',
      },
      {
        entry: 'electron/preload.ts'
      },
    ],
    renderer: {},
  },
})