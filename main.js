const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

// Global handler for unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Track the Python process and window object
let pythonProcess;
let win;

// IPC handler for minimizing the window
ipcMain.on("minimize-window", () => {
  if (win) {
    win.minimize();
  }
});

// IPC handler for closing the window
ipcMain.on("close-window", () => {
  if (win) {
    win.close();
  }
});

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true, // Ensures the default OS window frame with minimize/maximize/close buttons
    fullscreenable: true, // Allows toggling fullscreen mode
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(path.join(__dirname, "renderer/index.html"));

  // Start maximized (not fullscreen)
  win.maximize();

  // Optionally, you can still allow users to toggle fullscreen later
  win.setFullScreenable(true);
}

app.whenReady().then(() => {
  createWindow();

  // Spawn the Python script that continuously updates usage_log.json
  pythonProcess = spawn("python", ["src\\main.py"]);

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python error: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
  if (pythonProcess) {
    pythonProcess.kill();
  }
});

// Path to your usage_log.json file
const filePath = path.join(__dirname, "usage_log.json");

// IPC handler to get app usage data from usage_log.json
ipcMain.handle("get-app-usage", async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading usage_log.json file:", err);
        return reject("Error reading usage log");
      }
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData); // Send the data back to the renderer process
      } catch (parseError) {
        console.error("Error parsing usage_log.json:", parseError);
        return reject("Error parsing usage log");
      }
    });
  });
});

// IPC handler to show a custom notification
ipcMain.handle('show-break-notification', () => {
  const notification = new Notification({
    title: "Take a Break Reminder",
    body: "You've been working for a long time. It's time to take a break.",
    actions: [
      { type: "button", text: "Ignore" },
      { type: "button", text: "Take Break" }
    ],
    closeButtonText: "Dismiss"
  });

  notification.show();

  // Handle button actions
  notification.on('action', (event, index) => {
    if (index === 0) {
      console.log("Ignore button clicked");
    } else if (index === 1) {
      console.log("Take Break button clicked");
      win.webContents.send('reset-timer');  // You can send an event to reset or perform other actions
    }
  });

  notification.on('close', () => {
    console.log("Notification dismissed");
  });
});
