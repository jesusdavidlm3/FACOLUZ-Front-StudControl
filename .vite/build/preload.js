"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("env", {
  getBackendAddress: async () => {
    return await electron.ipcRenderer.invoke("get_Backend_Address");
  }
});
