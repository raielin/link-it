'use strict';

angular.module('linkIT', []);

document.addEventListener('DOMContentLoaded', function() {
  var linksModal = document.getElementById('linksModal');
  var showLinksModal = document.getElementById('showLinksModal');
  var closeModal = document.getElementById('closeModal');

  showLinksModal.addEventListener('click', function(e) {
    e.preventDefault();

    linksModal.showModal();
  });

  closeModal.addEventListener('click', function(e) {
    e.preventDefault();
    addLink();
    linksModal.close();
  });

});

var addLink = function() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  },
  function(tabs) {
    // console.log(tabs[0].title + ': ' + tabs[0].url);  // for testing use
    chrome.extension.sendMessage({
      from: 'popup',
      action: 'add',
      data: {
        title: tabs[0].title,
        url: tabs[0].url
      }
    });

    // Reload popup after adding new link.
    // location.reload() can take a parameter. Default is `false` which means the window reloads from the browser cache; true will reload window from server.
    location.reload();
  });
}
