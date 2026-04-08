// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "NEW_POST") {
    handlePost(request.payload)
  }
});

function handlePost(post) {
  if (post.text.includes("השכרה")) {
    chrome.storage.local.get(['keywords', 'savedPosts'], (data) => {
      const keywords = data.keywords
      const savedPosts = data.savedPosts

      keywords.forEach((word) => {
        if (post.text.includes(word.toLowerCase())) {
          savedPosts.push(post)
          chrome.storage.local.set({ savedPosts })
          return;
        }
      })
    })
  }
}