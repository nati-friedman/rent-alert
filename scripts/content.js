// scan if posts contain keywords
function scanPage() {
  // Check if the extension context is still valid
  if (!chrome.runtime?.id) {
    console.log("Extension context invalidated. Please refresh the page.");
    observer.disconnect(); // Stop the observer if we are orphaned
    return;
  }

  chrome.storage.local.get(['keywords'], (data) => {
    // This part only runs if the context is valid
    if (chrome.runtime.lastError) return;

    const keywords = data.keywords || [];
    const posts = document.querySelectorAll('div[role="article"]');

    posts.forEach(post => {
      const textContent = post.querySelector('div[dir="auto"]')?.innerText || post.innerText;
      const text = textContent.toLowerCase();
      keywords.forEach(word => {
        if (text.includes("השכרה") && text.includes(word.toLowerCase()) && !post.dataset.detected) {
          post.dataset.detected = "true";
          post.style.border = "2px solid green";
          const linkElement = post.querySelector('a[href*="/groups/"], a[href*="/posts/"]');
          const postUrl = linkElement ? (linkElement.href.split('?')[0]) : "URL not found";

          // Save to history
          saveMatch(word, textContent, postUrl);
        }
      });
    });
  });
}

function saveMatch(keyword, text, url) {
  chrome.storage.local.get(['matches'], (data) => {
    const matches = data.matches || [];
    const newMatch = {
      keyword,
      text,
      url,
      time: new Date().toLocaleString()
    };
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