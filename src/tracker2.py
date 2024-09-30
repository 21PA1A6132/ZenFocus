import time
import pygetwindow as gw
import psutil

# Function to get the current active window's title
def get_active_window():
    try:
        active_window = gw.getActiveWindow()
        if active_window:
            return active_window.title
        else:
            return None
    except Exception as e:
        print(f"Error getting active window: {e}")
        return None

# Function to track time spent on active windows
def track_activity():
    usage_log = {}
    current_window = get_active_window()  # Get current active window title
    start_time = time.time()  # Start time for the current window

    while True:
        new_window = get_active_window()  # Check the currently active window again

        if new_window != current_window:
            end_time = time.time()
            elapsed_time = end_time - start_time

            # Log the time spent on the previous window
            if current_window:
                if current_window not in usage_log:
                    usage_log[current_window] = 0
                usage_log[current_window] += elapsed_time

            # Update to the new active window
            current_window = new_window
            start_time = time.time()

        # Display the usage log every 10 seconds for debugging
        if int(time.time()) % 10 == 0:
            print("Currently active window:", current_window)
            print("Current Usage Log: ", usage_log)

        time.sleep(1)  # Sleep to reduce CPU load

if __name__ == "__main__":
    track_activity()
