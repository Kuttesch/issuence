"""
This module creates a webview window with a specified API.
"""

import webview
from backend.api import API

api = API()
window = webview.create_window(
    "Test",
    "http://localhost:5173", 
    js_api=api,
)
webview.start(debug=True)
