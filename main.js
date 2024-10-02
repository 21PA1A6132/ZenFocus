// // main.js
// const { app, BrowserWindow, ipcMain, Notification } = require("electron");
// const path = require("path");
// const fs = require("fs");
// const { spawn } = require("child_process");

// // Global handler for unhandled promise rejections
// process.on("unhandledRejection", (reason, promise) => {
//   console.error("Unhandled Rejection at:", promise, "reason:", reason);
// });

// // Track the Python process and window object
// let pythonProcess;
// let win;

// // IPC handler for minimizing the window
// ipcMain.on("minimize-window", () => {
//   if (win) {
//     win.minimize();
//   }
// });

// // IPC handler for closing the window
// ipcMain.on("close-window", () => {
//   if (win) {
//     win.close();
//   }
// });

// function createWindow() {
//   win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     frame: true,
//     fullscreenable: true,
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//       nodeIntegration: true,
//       contextIsolation: false,
//     },
//   });

//   win.loadFile(path.join(__dirname, "renderer/index.html"));
//   win.maximize();
//   win.setFullScreenable(true);
// }

// app.whenReady().then(() => {
//   createWindow();

//   // Spawn the Python script
//   pythonProcess = spawn("python", ["src\\main.py"]);

//   pythonProcess.stderr.on("data", (data) => {
//     console.error(`Python error: ${data}`);
//   });

//   pythonProcess.on("close", (code) => {
//     console.log(`Python process exited with code ${code}`);
//   });

//   app.on("activate", () => {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") app.quit();
//   if (pythonProcess) {
//     pythonProcess.kill();
//   }
// });

// // Path to your usage_log.json file
// const filePath = path.join(__dirname, "usage_log.json");

// // IPC handler to get app usage data from usage_log.json
// ipcMain.handle("get-app-usage", async () => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, "utf8", (err, data) => {
//       if (err) {
//         console.error("Error reading usage_log.json file:", err);
//         return reject("Error reading usage log");
//       }
//       try {
//         const jsonData = JSON.parse(data);
//         resolve(jsonData);
//       } catch (parseError) {
//         console.error("Error parsing usage_log.json:", parseError);
//         return reject("Error parsing usage log");
//       }
//     });
//   });
// });

// // Function to show a customized notification
// function showNotification(title, body) {
//   const notification = new Notification({
//     title: title,
//     body: body,
//     closeButtonText: "Dismiss",
//   });
//   notification.show();

//   notification.on("close", () => {
//     console.log("Notification dismissed");
//   });
// }

// // IPC handler to show a break notification
// ipcMain.handle("show-break-notification", () => {
//   showNotification("Take a Break Reminder", "You've been working for a long time. It's time to take a break.");
// });

// // IPC handler for stress relief notifications
// ipcMain.handle("show-stress-relief-notification", () => {
//   showNotification("Stress Relief Activity", "Time for some light meditation! Take a deep breath.");
// });


// const { app, BrowserWindow, ipcMain, Notification } = require("electron");
// const path = require("path");
// const fs = require("fs");
// const { spawn } = require("child_process");

// const { exec } = require('child_process');
// const open = require('open');

// // Existing code ...

// // IPC handler for playing soothing music
// ipcMain.on('play-music', () => {
//     exec('start path_to_music.mp3');  // For Windows; replace with the actual path to your music file
// });

// // IPC handler for opening a relaxing game
// ipcMain.on('open-game', () => {
//     open('https://www.calming-games.com/');  // Opens the calming online game in the default browser
// });


// function showNotification(title, body) {
//   const notification = new Notification({
//     title: title,
//     body: body,
//     actions: [{ text: "Play Music", type: "button" }, { text: "Open Game", type: "button" }],
//     closeButtonText: "Dismiss",
//   });
  
//   notification.show();

//   notification.on('action', (event) => {
//     if (event.action === "Play Music") {
//       exec('"C:\Users\Karthikeya\Downloads\Usure Neethane Neethane Bgm.mp3"');
//     } else if (event.action === "Open Game") {
//       open('https://www.mindgames.com/');
//     }
//   });

//   notification.on("close", () => {
//     console.log("Notification dismissed");
//   });
// }

// // Global handler for unhandled promise rejections
// process.on("unhandledRejection", (reason, promise) => {
//   console.error("Unhandled Rejection at:", promise, "reason:", reason);
// });

// // Track the Python process and window object
// let pythonProcess;
// let win;

// // IPC handler for minimizing the window
// ipcMain.on("minimize-window", () => {
//   if (win) {
//     win.minimize();
//   }
// });

// // IPC handler for closing the window
// ipcMain.on("close-window", () => {
//   if (win) {
//     win.close();
//   }
// });

// function createWindow() {
//   win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     frame: true,
//     fullscreenable: true,
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//       nodeIntegration: true,
//       contextIsolation: false,
//     },
//   });

//   win.loadFile(path.join(__dirname, "renderer/index.html"));
//   win.maximize();
//   win.setFullScreenable(true);
// }

// app.whenReady().then(() => {
//   createWindow();

//   // Spawn the Python script
//   pythonProcess = spawn("python", ["src\\main.py"]);

//   pythonProcess.stderr.on("data", (data) => {
//     console.error(`Python error: ${data}`);
//   });

//   pythonProcess.on("close", (code) => {
//     console.log(`Python process exited with code ${code}`);
//   });

//   app.on("activate", () => {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") app.quit();
//   if (pythonProcess) {
//     pythonProcess.kill();
//   }
// });

// // Path to your usage_log.json file
// const filePath = path.join(__dirname, "usage_log.json");

// // IPC handler to get app usage data from usage_log.json
// ipcMain.handle("get-app-usage", async () => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, "utf8", (err, data) => {
//       if (err) {
//         console.error("Error reading usage_log.json file:", err);
//         return reject("Error reading usage log");
//       }
//       try {
//         const jsonData = JSON.parse(data);
//         resolve(jsonData);
//       } catch (parseError) {
//         console.error("Error parsing usage_log.json:", parseError);
//         return reject("Error parsing usage log");
//       }
//     });
//   });
// });

// // Function to show a customized notification with buttons
// function showNotificationWithActions(notificationData) {
//   const notification = new Notification({
//     title: notificationData.title,
//     body: notificationData.body,
//     actions: notificationData.buttons ? notificationData.buttons.map(btn => ({ text: btn.label })) : [],
//     closeButtonText: "Dismiss",
//   });

//   notification.show();

//   // Handling button actions (Windows/Linux only)
//   if (notificationData.buttons) {
//     notification.on('action', (event, index) => {
//       const buttonAction = notificationData.buttons[index].action;
//       handleNotificationAction(buttonAction);
//     });
//   }

//   notification.on("close", () => {
//     console.log("Notification dismissed");
//   });
// }

// // Function to handle button actions
// function handleNotificationAction(action) {
//   switch (action) {
//     case "show_exercise":
//       console.log("Showing exercises...");
//       // Add logic here to show exercises
//       break;
//     case "play_music":
//       console.log("Playing soothing music...");
//       // Add logic here to play soothing music
//       break;
//     default:
//       console.log("No action defined for this button");
//   }
// }

// // IPC handler to show a break notification with a button
// ipcMain.handle("show-break-notification", () => {
//   const breakNotification = {
//     title: "Take a Break Reminder",
//     body: "You've been working for a long time. It's time to take a break.",
//     buttons: [{ label: "Show Exercise", action: "show_exercise" }],
//   };
//   showNotificationWithActions(breakNotification);
// });

// // IPC handler for stress relief notifications with a button
// ipcMain.handle("show-stress-relief-notification", () => {
//   const stressNotification = {
//     title: "Stress Relief Activity",
//     body: "Time for some light meditation! Take a deep breath.",
//     buttons: [{ label: "Play Music", action: "play_music" }],
//   };
//   showNotificationWithActions(stressNotification);
// });


// main.js
const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");
const { exec } = require("child_process");

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
    frame: true,
    fullscreenable: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(path.join(__dirname, "renderer/index.html"));
  win.maximize();
  win.setFullScreenable(true);
}

app.whenReady().then(() => {
  createWindow();

  // Spawn the Python script
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
        resolve(jsonData);
      } catch (parseError) {
        console.error("Error parsing usage_log.json:", parseError);
        return reject("Error parsing usage log");
      }
    });
  });
});

// Function to show a customized notification
function showNotification(title, body) {
  const notification = new Notification({
    title: title,
    body: body,
    closeButtonText: "Dismiss",
  });
  notification.show();

  notification.on("close", () => {
    console.log("Notification dismissed");
  });
}

// IPC handler to show a break notification
ipcMain.handle("show-break-notification", () => {
  showNotification("Take a Break Reminder", "You've been working for a long time. It's time to take a break.");
});

// IPC handler for stress relief notifications
ipcMain.handle("show-stress-relief-notification", () => {
  showNotification("Stress Relief Activity", "Time for some light meditation! Take a deep breath.");
});

// IPC handler to play soothing music
ipcMain.on("play-music", () => {
  const musicPath = path.join(__dirname, "Usure Neethane Neethane Bgm.mp3"); // Adjust the music file path accordingly
  exec(`start ${musicPath}`, (err) => {
    if (err) {
      console.error("Error playing music:", err);
    } else {
      console.log("Playing soothing music.");
    }
  });
});

// IPC handler to open a relaxing game
ipcMain.on("open-game", () => {
  const gamePath = path.join(__dirname, "path/to/relaxing/game.exe"); // Adjust the game file path accordingly
  exec(`start ${gamePath}`, (err) => {
    if (err) {
      console.error("Error opening the game:", err);
    } else {
      console.log("Opening relaxing game.");
    }
  });
});
