# main.py
from newtracker import ActivityTracker
from plyer import notification
import time
import threading

def notify_user(message):
    notification.notify(
        title="ZenFocus Reminder",
        message=message,
        timeout=10
    )

def track_activity(tracker):
    tracker.track()  # This will keep running and logging activity

if __name__ == "__main__":
    tracker = ActivityTracker()
    
    # Start tracking activity in a separate thread
    tracking_thread = threading.Thread(target=track_activity, args=(tracker,), daemon=True)
    tracking_thread.start()

    # Send notifications for break reminders every hourfrom newtracker import ActivityTracker
import time
import threading

def track_activity(tracker):
    tracker.track()  # This will keep running and logging activity

if __name__ == "__main__":
    tracker = ActivityTracker()
    
    # Start tracking activity in a separate thread
    tracking_thread = threading.Thread(target=track_activity, args=(tracker,), daemon=True)
    tracking_thread.start()

    try:
        while True:
            time.sleep(1)  # Keep the main program running
    except KeyboardInterrupt:
        print("Stopping the tracker...")
        tracker.save_log()  # Save the log when the program is interrupted
        print("Usage log saved. Exiting.")
    break_interval = 60 # 1 hour
    last_break_time = time.time()
    
    try:
        while True:
            current_time = time.time()
            if current_time - last_break_time >= break_interval:
                notify_user("Time to take a break! Stretch and relax!")
                last_break_time = current_time
            
            time.sleep(5)  # Check every 5 seconds if it's time for a break
    except KeyboardInterrupt:
        print("Stopping the tracker...")
        tracker.save_log()  # Save the log when the program is interrupted
        print("Usage log saved. Exiting.")
