const { contextBridge, ipcRenderer } = require('electron');

// Expose a method to listen for data from the backend (Python)
contextBridge.exposeInMainWorld('electronAPI', {
    fromPython: (callback) => ipcRenderer.on('fromPython', (event, data) => callback(data)),
    showBreakNotification: () => ipcRenderer.invoke('show-break-notification')  // Expose the notification method
});
