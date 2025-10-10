"use strict";const e=require("electron");e.contextBridge.exposeInMainWorld("env",{getBackendAddress:async()=>await e.ipcRenderer.invoke("get_Backend_Address")});
