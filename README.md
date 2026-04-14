# Rent Alert (Chrome Extension)

Rent Alert helps you monitor Facebook Groups for apartment and rental posts using custom keywords, local match history, and Telegram alerts.

## Features

- **Keyword filtering**: Add and manage search terms in the side panel to detect relevant posts automatically.
- **Facebook Group scanning**: The content script observes new posts in Facebook group feeds and sends candidates to the background service worker.
- **Match storage**: All detected matches are stored in Chrome local storage so you can review them later.
- **Export to CSV**: Download matched posts as a spreadsheet with date, keyword, URL, and post text.
- **Clear history**: Reset saved matches directly from the side panel.
- **Telegram notification support**: Automatically send a Telegram alert for each matching post when a keyword is detected.

## Technical Stack

- **JavaScript (ES6)**: Core logic for scraping, storage, and UI behavior.
- **Chrome Extension Manifest V3**: Uses a module-based background service worker and content scripts.
- **MutationObserver API**: Detects dynamically loaded Facebook posts in the group feed.
- **Chrome Storage API**: Persists keywords and matched posts locally.

## Project Structure

| File | Purpose |
| :--- | :--- |
| `manifest.json` | Extension manifest, permissions, and side panel entry point. |
| `src/scripts/content.js` | Content script that scans Facebook group posts and sends matches to the service worker. |
| `src/scripts/background.js` | Background module that filters matches, saves them, and sends Telegram alerts. |
| `src/utils/side-panel.html` | Side panel UI for keyword management, exporting CSV, and clearing history. |
| `src/utils/side-panel.js` | Behavior for the side panel interface. |
| `src/styles/side-panel.css` | Styling for the side panel UI. |
| `config.js` | Telegram bot configuration for alert delivery. |

## Installation

1. Clone or download the repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the `RentAlert` project folder.
6. Use the extension icon or side panel button to open the settings panel.

## How to Use

1. Open a Facebook Group feed at `https://www.facebook.com/groups/...`.
2. Open the extension side panel via the toolbar action.
3. Add keywords that describe the rental posts you want to catch.
4. Save keywords and keep the Facebook group page open.
5. The extension saves matches when a post contains both the Hebrew rental term `השכרה` and any active keyword.
6. Export matches to CSV or clear stored history from the side panel.

## Notes and Limitations

- The current implementation assumes Facebook group posts use `role="article"` markup and a link to `/groups/` or `/posts/`.
- The background logic currently requires posts to contain the Hebrew word `השכרה` before applying keyword filters.
- If detection stops working, the selectors in `src/scripts/content.js` may need adjustment.
- Keep your Telegram bot credentials in `config.js` private.

---