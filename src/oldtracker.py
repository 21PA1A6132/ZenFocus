import time
import json
from src.utils.window_utils import get_active_window_title, is_idle
import google.generativeai as genai  # Import Google Gemini API
from win10toast_click import ToastNotifier  # For notifications

# Activity categories
CATEGORIES = [
    "Shopping", "Education", "Social Media", "Coding/Development",
    "News", "Entertainment", "Work/Productivity", "Gaming", 
    "Video Streaming", "Health & Fitness", "Unknown"
]
genai.configure(api_key="AIzaSyBAJ2p2QFtH3fWb8PufBGQvKfLD45uMaKs")

class ActivityTracker:
    def __init__(self):
        self.usage_log = {}
        self.current_window = None
        self.start_time = None
        self.notify_threshold = 30 * 60  # 30 minutes threshold for notification (in seconds)
        self.model = genai.GenerativeModel("gemini-1.5-flash")  # Instantiate the Gemini Model
        self.toaster = ToastNotifier()  # Initialize the notification toaster

    def categorize_activity(self, window_title):
        # Check predefined categories first
        for key in CATEGORIES:
            if key.lower() in window_title.lower():
                return key  # Fixing index to return the correct key
        
        # Use Gemini API to categorize if not found in predefined categories
        prompt = f"Classify the following activity based on the title: '{window_title}'. Only provide one word from these categories: {', '.join(CATEGORIES)}."
        response = self.model.generate_content(prompt)
        category = response.text.strip()
        return category if category else "Unknown"

    def track(self):
        print("Tracking started... Press Ctrl+C to stop.")
        try:
            while True:
                if not is_idle():
                    active_window = get_active_window_title()
                    if active_window:
                        self.log_activity(active_window)
                time.sleep(5)  # Sleep for 5 seconds before checking again
        except KeyboardInterrupt:
            print("Tracking stopped.")
            self.save_log()

    def log_activity(self, window_title):
        current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

        # If switching to a new window
        if self.current_window != window_title:
            if self.current_window:
                # Save time spent on the previous window
                elapsed_time = time.time() - self.start_time
                self.usage_log[self.current_window]["time_spent"] += elapsed_time

            # Switch to the new window
            self.current_window = window_title
            self.start_time = time.time()

            # Initialize log entry if not present
            if window_title not in self.usage_log:
                self.usage_log[window_title] = {
                    "category": None,  # Set category to None initially
                    "time_spent": 0, 
                    "start_time": current_time
                }

            # Call categorize_activity function and display the category
            category = self.categorize_activity(window_title)
            self.usage_log[window_title]["category"] = category  # Update log entry with category
            print(f"Current Activity: {window_title} ({category})")  # Display category immediately

            # Save the updated log whenever there's a switch
            self.save_log()

        # Check if the user has been using the current window for more than the threshold
        elapsed_time = time.time() - self.start_time
        if elapsed_time >= self.notify_threshold:
            print(f"User has been using {window_title} for more than 30 minutes. Trigger notification.")
            self.trigger_break_notification()

    def trigger_break_notification(self):
        self.toaster.show_toast(
            "ZenFocus Reminder",
            "You have been using this app for 30 minutes. Time to take a break!",
            duration=10,  # Show notification for 10 seconds
            threaded=True,
            callback_on_click=self.on_click_take_break  # User clicks the notification
        )

    def on_click_take_break(self):
        print("User clicked the 'Take a break' notification.")

    def save_log(self):
        # Save elapsed time for the last active window
        if self.current_window:
            elapsed_time = time.time() - self.start_time
            self.usage_log[self.current_window]["time_spent"] += elapsed_time
        
        with open("usage_log.json", "w") as f:
            json.dump(self.usage_log, f, indent=4)
        print("Usage log updated.")