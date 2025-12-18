const input = document.getElementById('keywordInput');
const addBtn = document.getElementById('addBtn');
const kwList = document.getElementById('keywordList');
const historyList = document.getElementById('matchHistory');

// Load data on open
chrome.storage.local.get(['keywords', 'matches'], (data) => {
  displayKeywords(data.keywords || []);
  displayMatches(data.matches || []);
});

addBtn.onclick = () => {
  const word = input.value.trim();
  if (!word) return;

  chrome.storage.local.get(['keywords'], (data) => {
    const newList = [...(data.keywords || []), word];
    chrome.storage.local.set({ keywords: newList }, () => {
      displayKeywords(newList);
      input.value = '';
    });
  });
};

function displayKeywords(list) {
  kwList.innerHTML = list.map(w => `<span>${w} </span>`).join('');
}

function displayMatches(matches) {
  historyList.innerHTML = matches.map(m => `
    <div class="match-item">
      <strong>${m.keyword}</strong>: ${m.text.substring(0, 50)}...
    </div>
  `).join('');
}
