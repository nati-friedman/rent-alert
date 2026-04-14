// Observe new posts
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Check if this node is a post
        if (node.getAttribute('role') === 'article') {
          scrapePost(node);
        }

        // Also check children in case the post is nested deeper
        const articles = node.querySelectorAll?.('[role="article"]');
        if (articles) {
          articles.forEach(article => scrapePost(article));
        }
      }
    });
  }
});

// Send post data to a service worker
const scrapePost = (element) => {
  if (chrome.runtime?.id) {
    const textContent = element.querySelector('div[dir="auto"]')?.innerText || element.innerText;
    const linkElement = element.querySelector('a[href*="/groups/"], a[href*="/posts/"]');
    const postUrl = linkElement ? (linkElement.href.split('?')[0]) : "URL not found";

    const data = {
      text: textContent,
      timestamp: new Date().toISOString(),
      url: postUrl
    };

    chrome.runtime.sendMessage({ type: "NEW_POST", payload: data });
  }
};

// Start the observer when DOM is ready
if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
  })
};