'use strict';

$(document).ready(function() {
  // console.log("document ready!"); // for testing use only.

  var linksList;

  // Find active tab in order to send a message to content script
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    // send message to content script in activeTab
    function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {
        from: "popup",
        message: "popup_ready"
      });
    }
  );

// Listen for message from content that includes list of URLs to insert into popup view.
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if ((request.from === "content") && (request.message === "linksList_success")) {
        linksList = request.linksList;
        // console.log(request.linksList);  // for testing use only
        populateLinksList(request.linksList);
      }
    }
  );

  document.getElementById("button").onclick = function() {
    goLinkIt(linksList);
  };
});


// Function to insert URLs into popup HTML.
// Takes an array of URLs as a parameter, creates list of URLs in popup view.
function populateLinksList(urls) {
  var linksTable = document.getElementById("links");

  // First, clear any values that might exist from prior use.
  while (linksTable.children.length > 0) {
    linksTable.removeChild(linksTable.children[linksTable.children.length - 1]);
  }

  for (var i = 0; i < urls.length; i++) {
    var row = document.createElement("tr");
    var col0 = document.createElement("td");
    var col1 = document.createElement("td");
    var checkbox = document.createElement("input");

    checkbox.checked = false;
    checkbox.type = "checkbox";
    checkbox.id = "check" + i;

    col0.appendChild(checkbox);
    col1.innerText = urls[i];
    col1.style.whiteSpace = "nowrap";

    col1.onclick = function() {
      checkbox.checked = !checkbox.checked;
    }

    row.appendChild(col0);
    row.appendChild(col1);
    linksTable.appendChild(row);
  }
}

// send message to background.js to open selected url in new tab
// using list of URLs as parameter here as a hack for now. Need to map through HTML elements instead and grab text value of selected table row.
function goLinkIt(urls) {
  for (var i = 0; i < urls.length; i++) {
    if (document.getElementById("check" + i).checked) {
      chrome.tabs.create({
        url: urls[i]
      });
    }
  }
}
