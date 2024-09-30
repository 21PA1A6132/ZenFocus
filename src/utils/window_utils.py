# src/utils/window_utils.py
import win32gui
import time
from ctypes import Structure, windll, c_uint, sizeof, byref

# Getting the active window
def get_active_window_title():
    window = win32gui.GetForegroundWindow()
    return win32gui.GetWindowText(window)

# Idle time detection
class LASTINPUTINFO(Structure):
    _fields_ = [('cbSize', c_uint), ('dwTime', c_uint)]

def get_idle_duration():
    lastInputInfo = LASTINPUTINFO()
    lastInputInfo.cbSize = sizeof(LASTINPUTINFO)
    windll.user32.GetLastInputInfo(byref(lastInputInfo))
    millis = windll.kernel32.GetTickCount() - lastInputInfo.dwTime
    return millis / 1000.0  # Convert to seconds

def is_idle(threshold=180):  # Idle if no activity for 3 minutes (180s)
    return get_idle_duration() > threshold

