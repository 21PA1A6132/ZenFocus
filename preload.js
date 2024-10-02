// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Expose methods to interact with the main process
contextBridge.exposeInMainWorld('electronAPI', {
    fromPython: (callback) => ipcRenderer.on('fromPython', (event, data) => callback(data)),
    showBreakNotification: () => ipcRenderer.invoke('show-break-notification'),
    showStressReliefNotification: () => ipcRenderer.invoke('show-stress-relief-notification'),
    playMusic: () => ipcRenderer.send('play-music'),  // Exposing the play music function
    openGame: () => ipcRenderer.send('open-game')     // Exposing the open game function
});

