"""
This module creates a webview window with a specified API.
"""

import webview
from backend.api import API

api = API()
window = webview.create_window(
    "Window",
    "http://localhost:5173",
    min_size=(500, 500),
    js_api=api,
)
webview.start(debug=True)
