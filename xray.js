var running = false;

chrome.browserAction.onClicked.addListener(function(tab) {

  if (running === false) {
    running = true;
    chrome.browserAction.setIcon({
      path : "xray_off.png"
    });
    chrome.tabs.query({}, function(tabs) {
      for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.executeScript(tabs[i].id, {
          code : "document.documentElement.style.webkitFilter='sepia(100%) invert(100%)';",
        });
      }
    });
  }
  else {
    running = false;
    chrome.browserAction.setIcon({
      path : "xray.png"
    });
    chrome.tabs.query({}, function(tabs) {
      for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.executeScript(tabs[i].id, {
          code : "document.documentElement.style.webkitFilter=''"
        });
      }
    });
  }

});

chrome.tabs.onUpdated.addListener(function() {
  if (running === true) {
    chrome.tabs.executeScript(null, {
      code : "document.documentElement.style.webkitFilter='sepia(100%)  invert(100%)';",
     });
  }

});
