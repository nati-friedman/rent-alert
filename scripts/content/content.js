// Observe new posts
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE &&
          node.getAttribute('role') === 'article') {
        scrapePost(node)
      }
    })
  }
});

// Send post data to a background worker
const scrapePost = (element) => {
  const data = {
    id: element.getAttribute('id') || Date.now().toString(),
    text: element.innerText.substring(0, 500),
    timestamp: new Date().toISOString(),
    url: window.location.href
  };

  chrome.runtime.sendMessage({ type: "NEW_POST", payload: data });
};

// Start the observer
observer.observe(document.body, { childList: true, subtree: true });