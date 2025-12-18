// scan if posts contain keywords
function scanPage() {
  chrome.storage.local.get(['keywords'], (data) => {
    const keywords = data.keywords || [];
    const posts = document.querySelectorAll('div[role="article"]');

    posts.forEach(post => {
      const text = post.innerText.toLowerCase();
      keywords.forEach(word => {
        if (text.includes(word.toLowerCase()) && !post.dataset.detected) {
          post.dataset.detected = "true";
          post.style.border = "2px solid red";

          // Save to history
          saveMatch(word, post.innerText);
        }
      });
    });
  });
}

function saveMatch(keyword, text) {
  chrome.storage.local.get(['matches'], (data) => {
    const matches = data.matches || [];
    const newMatch = { keyword, text, time: new Date().toLocaleString() };
    chrome.storage.local.set({ matches: [newMatch, ...matches].slice(0, 20) });

    // Send message to background.js to trigger a desktop notification
    chrome.runtime.sendMessage({
      action: "matchFound",
      keyword: keyword
    });
  });
}

// Observe for new posts
const observer = new MutationObserver(scanPage);
observer.observe(document.body, { childList: true, subtree: true });