document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('keywordInput');
  const addBtn = document.getElementById('addBtn');
  const resetBtn = document.getElementById('resetBtn');
  const kwList = document.getElementById('keywordList');
  const exportBtn = document.getElementById('exportBtn');
  const clearBtn = document.getElementById('clearBtn');

  // Load and display existing keywords when popup opens
  function updateDisplay() {
    chrome.storage.local.get(['keywords'], (data) => {
      const list = data.keywords || [];
        kwList.innerHTML = list.map(w => `<div class="kw-tag">${w}</div>`).join('');
    });
  }

  updateDisplay();

  // Add buttons logic
  addBtn.addEventListener('click', addKeyword);
  resetBtn.addEventListener('click', clearKeywords);
  exportBtn.addEventListener('click', exportToCSV);
  clearBtn.addEventListener('click', clearHistory);

  function addKeyword() {
    const word = input.value.trim();
    if (!word)
      return;

    chrome.storage.local.get(['keywords'], (data) => {
      const currentKeywords = data.keywords || [];

      // Check if keyword already exists to avoid duplicates
      if (!currentKeywords.includes(word)) {
        const newList = [...currentKeywords, word];

        chrome.storage.local.set({ keywords: newList }, () => {
          input.value = ''; // Clear input
          updateDisplay();  // Refresh the list
        });
      }
    })
  };

  function clearKeywords() {
    chrome.storage.local.set({ keywords: [] }, () => {
      updateDisplay();  // Refresh the list
    });
  };

  function exportToCSV() {
      chrome.storage.local.get(['matches'], (data) => {
          const matches = data.matches || [];
          if (matches.length === 0) {
              alert("No matches to export yet!");
              return;
          }

          // 1. Create CSV Header
          let csvContent = "data:text/csv;charset=utf-8,Date,Keyword,Link,Post Content\n";

          // 2. Add Rows (Clean text to avoid breaking CSV format)
          matches.forEach(match => {
            const cleanText = match.text.replace(/"/g, '""').replace(/\n/g, ' ');
            csvContent += `"${match.time}","${match.keyword}","${match.url}","${cleanText}"\n`;
          });

          // 3. Trigger Download
          const encodedUri = encodeURI(csvContent);
          const link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", `rent_alert__matches_${new Date().toLocaleDateString()}.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      });
  }

  function clearHistory() {
      if (confirm("Are you sure you want to delete all saved matches?")) {
          chrome.storage.local.set({ matches: [] }, () => {
              location.reload(); // Refresh popup to show empty list
          });
      }
  }
});