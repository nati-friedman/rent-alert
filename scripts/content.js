// --- CONFIGURATION ---
const KEYWORDS = ["בניה", "מושב", "השכרה"];
const PROCESSED_POSTS = new Set(); // To avoid notifying twice for the same post

function checkPost(postElement) {
    // Facebook posts usually contain text inside specific spans or divs
    // We get all text content and check for keywords
    const text = postElement.innerText.toLowerCase();

    const foundKeyword = KEYWORDS.find(word => text.includes(word.toLowerCase()));

    if (foundKeyword && !PROCESSED_POSTS.has(postElement)) {
        PROCESSED_POSTS.add(postElement);

        console.log(`%c [Found!] Keyword "${foundKeyword}" in post:`, "color: green; font-weight: bold;");

        // Visual cue: Highlight the post
        postElement.style.border = "5px solid #4267B2";
        postElement.style.backgroundColor = "#f0f2f5";

        // Alert the user
        alert(`Match found for: ${foundKeyword}`);
    }
}

// Step 1: Initial scan of posts already on the page
// TODO: check fb post selector
function scanExistingPosts() {
  const posts = document.querySelectorAll('div[role="article"] > div, div[data-ad-comet-preview="message"]');
  posts.forEach(checkPost);
}

// Step 2: Watch for new posts being added (MutationObserver)
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Check if it's an element
                // Scan the added node or its children for posts
                checkPost(node);
            }
        });
    }
});

// Start observing the body for changes
observer.observe(document.body, { childList: true, subtree: true });

// Run initial scan
scanExistingPosts();