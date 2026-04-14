import { CONFIG } from '../../config.js'

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "NEW_POST") {
    handlePost(request.payload)
  }
});

async function handlePost(post) {
  console.log("start handle post");

  if (post.text.includes("השכרה")) {
    chrome.storage.local.get(['keywords', 'matches'], (data) => {
      const keywords = data.keywords || []
      const matches = data.matches || []

      keywords.forEach((word) => {
        if (post.text.includes(word.toLowerCase())) {
          console.log("match found");

          const newPost = { ...post, keyword: word }
          chrome.storage.local.set({ matches: [...matches, newPost] })
          console.log("match saved");

          sendTelegramAlert(newPost)
          return;
        }
      })
    })
  }
}

async function sendTelegramAlert(post) {
  console.log("send telegram message");

  const url = `https://api.telegram.org/bot${CONFIG.API_TOKEN}/sendMessage`;
  const messageText = `🏠 *New Apartment Found!*\n\nKeyword: ${post.keyword}\n\n${post.text}\n\n[View on Facebook](${post.url})`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CONFIG.CHAT_ID,
        text: messageText,
        parse_mode: "Markdown"
      })
    });
    console.log("Telegram alert sent!");
  } catch (error) {
    console.error("Telegram failed:", error);
  }
}