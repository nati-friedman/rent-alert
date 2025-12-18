# Rent Alert (Chrome Extension)

A lightweight, personal automation tool designed to monitor Facebook Groups for specific housing-related keywords. This extension helps users find apartment listings in real-time without the "endless scroll."

## Features

- **Keyword Monitoring**: Scans Facebook Group posts dynamically as you scroll or as new content loads.
- **Local Storage**: Saves all matched posts locally so you can review them later.
- **CSV Export**: Export your lead list into an organized spreadsheet including the post date, keyword matched, and the direct URL to the post.
- **Customizable**: Manage your keyword list through a simple popup interface.

## Technical Stack

- **JavaScript (ES6)**: Core logic for DOM manipulation and storage.
- **MutationObserver API**: Used to detect new posts in Facebook's Single Page Application (SPA) environment.
- **Chrome Extension API (Manifest V3)**: Utilizes `chrome.storage`, `chrome.runtime`, and `background service workers`.

## Project Structure

| File | Purpose |
| :--- | :--- |
| `manifest.json` | Extension configuration and permissions. |
| `content.js` | The logic that runs on the Facebook page to scan posts. |
| `background.js` | Service worker that handles system notifications. |
| `popup.html/js` | The user interface for settings and history. |
| `styles.css` | Visual styling for the popup and post highlighting. |

## Installation

Since this is a personal tool, you must load it as an "Unpacked Extension":

1. Download or clone this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle switch in the top right corner).
4. Click the **Load unpacked** button.
5. Select the folder containing the project files.
6. (Optional) Pin the extension to your toolbar for easy access.

## How to Use

1. Click the extension icon to open the popup.
2. Add keywords you are looking for (e.g., "studio", "sublet", "lease transfer", "ohio").
3. Open any Facebook Group you are a member of.
4. As you scroll, matching posts will be highlighted with a green border.
5. Check the popup to see your history or export your leads to a `.csv` file.

## Important Note

This tool is for **personal use only**. Facebook's HTML structure changes frequently. If the extension stops detecting posts, check if the selectors in `content.js` need updating to match Facebook's current DOM attributes.

---
Created with ❤️ for the house hunting community.