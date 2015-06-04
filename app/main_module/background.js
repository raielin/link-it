'use strict';

// Add listener for onMessage event. Callback function creates a new instance for linkITStorageService and gets a request object that contains two properties: action - type of action background process is to perform; data - object of the data we want to add.
// Send object with chrome.extension.sendMessage event that is triggered from a click of the "Add new link" button in popup.

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request) {
    var storageService = new linkITStorageService();
    if ((request.from === 'popup') && (request.action === 'add')) {
      storageService.add(request.data);
    }
  }
});
