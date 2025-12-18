chrome.runtime.onMessage.addListener((request) => {
  if(request.type === 'alert'){
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon48.png',
      title: 'New Apartment Post!',
      message: request.message
    });
  }
});