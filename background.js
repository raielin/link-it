// background.js
// Send an arbitrary JSON payload to current tab. Chose "message" as key but could be anything.

// Listen for message from popup.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if ((request.from === "popup") && (request.message === "go_link_it")) {
      // alert("go_link_it!");   // for testing use only
      getActiveTab();
    }
  }
);

// Called upon receipt of message from popup.js.
var getActiveTab = function(tab) {
  // Get active tab
  chrome.tabs.query(
  {
    active: true,
    currentWindow: true
  },
  // Send message to activeTab, to be received by contentscript.js.
  function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      from: "background",
      message: "active_tab_success"
    });
  });
};

// Listen for message from content script to open new browser tab pointing to URL provided by content script.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if ((request.from === "content") && (request.message === "open_new_tab")) {
      chrome.tabs.create({
        url: request.url
      });
    }
  }
);
