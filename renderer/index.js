const { ipcRenderer } = require("electron");

async function displayUsageData() {
  try {
    const usageData = await ipcRenderer.invoke("get-app-usage");
    const container = document.getElementById("appUsageList");

    // Clear previous data
    container.innerHTML = "";

    // Loop through each entry in the data and display it
    Object.keys(usageData).forEach((appName) => {
      const appDetails = usageData[appName];
      const appElement = document.createElement("div");
      appElement.classList.add("app-entry");

      appElement.innerHTML = `
        <h3>${appName}</h3>
        <p><strong>Category:</strong> ${appDetails.category}</p>
        <p><strong>Time Spent:</strong> ${appDetails.time_spent.toFixed(2)} seconds</p>
        <p><strong>Start Time:</strong> ${appDetails.start_time}</p>
        <p><strong>End Time:</strong> ${appDetails.end_time ? appDetails.end_time : "Still Running"}</p>
      `;

      container.appendChild(appElement);
    });
  } catch (error) {
    console.error("Error displaying usage data:", error);
  }
}

// Call displayUsageData initially and every 5 seconds (5000ms) to refresh the data
window.onload = () => {
  displayUsageData();
  setInterval(displayUsageData, 1000); // Refresh every 5 seconds

  // Add event listener for testing the notification
  const testNotificationBtn = document.getElementById('testNotificationBtn');
  testNotificationBtn.addEventListener('click', () => {
    // Call the method to show the break reminder notification
    window.electronAPI.showBreakNotification();
  });
};
