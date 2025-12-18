document.getElementById('save').addEventListener('click', () => {
  const location = document.getElementById('location').value;
  const rooms = document.getElementById('rooms').value;
  const price = document.getElementById('price').value;

  chrome.storage.sync.set({location, rooms, price}, () => {
    alert('Preferences saved!');
  });
});
