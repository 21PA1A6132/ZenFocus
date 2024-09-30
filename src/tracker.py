import time
from utils.window_utils import get_active_window

def track_activity():
    usage_log = {}
    current_window = get_active_window()
    start_time = time.time()

    while True:
        new_window = get_active_window()

        if new_window != current_window:
            end_time = time.time()
            elapsed_time = end_time - start_time

            # Log the time spent on the previous window
            if current_window:
                if current_window not in usage_log:
                    usage_log[current_window] = 0
                usage_log[current_window] += elapsed_time

            # Switch to new window and reset time tracking
            current_window = new_window
            start_time = time.time()

        # Print current activity log every 10 seconds for debugging purposes
        if int(time.time()) % 10 == 0:
            print("Current Usage Log: ", usage_log)

        time.sleep(1)  # Delay to reduce CPU usage
