import{_ as i}from"./nuxt-link.9c3042e1.js";import{g as a,c,d as o,t as d,h as u,b as l,w as p,o as m}from"./entry.83bf81a2.js";const e=typeof require<"u"?function(){return require("electron")}():function(){return console.error('If you need to use "electron" in the Renderer process, make sure that "nodeIntegration" is enabled in the Main process.'),{}}();let t;if(typeof document>"u"){t={};const n=["invoke","postMessage","send","sendSync","sendTo","sendToHost","addListener","emit","eventNames","getMaxListeners","listenerCount","listeners","off","on","once","prependListener","prependOnceListener","rawListeners","removeAllListeners","removeListener","setMaxListeners"];for(const r of n)t[r]=()=>{throw new Error(`ipcRenderer doesn't work in a Web Worker.
You can see https://github.com/electron-vite/vite-plugin-electron/issues/69`)}}else t=e.ipcRenderer;e.clipboard;e.contextBridge;e.crashReporter;const _=t;e.nativeImage;e.shell;e.webFrame;e.deprecate;const k={__name:"random",setup(n){const r=a();return console.log(_),(f,g)=>{const s=i;return m(),c("div",null,[o(" Random Page "+d(u(r).fullPath)+" ",1),l(s,{to:"/"},{default:p(()=>[o("Home Page")]),_:1})])}}};export{k as default};
