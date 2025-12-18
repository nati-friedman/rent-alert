document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('keywordInput');
    const addBtn = document.getElementById('addBtn');
    const kwList = document.getElementById('keywordList');

    // 1. Load and display existing keywords when popup opens
    function updateDisplay() {
        chrome.storage.local.get(['keywords'], (data) => {
            const list = data.keywords || [];
            kwList.innerHTML = list.map(w => `<div class="kw-tag">${w}</div>`).join('');
        });
    }

    updateDisplay();

    // 2. Add button logic
    addBtn.addEventListener('click', () => {
        const word = input.value.trim();
        if (!word) return;

        chrome.storage.local.get(['keywords'], (data) => {
            const currentKeywords = data.keywords || [];

            // Check if keyword already exists to avoid duplicates
            if (!currentKeywords.includes(word)) {
                const newList = [...currentKeywords, word];

                chrome.storage.local.set({ keywords: newList }, () => {
                    console.log("Keyword saved:", word);
                    input.value = ''; // Clear input
                    updateDisplay();  // Refresh the list
                });
            }
        });
    });
});