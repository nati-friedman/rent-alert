// Listen for messages from content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "matchFound") {
    // Trigger a system notification
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Apartment Match Found!",
      message: `Keyword "${request.keyword}" detected in a group post.`,
      priority: 2
    });
  }
});

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));