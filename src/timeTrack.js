var hostname = window.location.hostname;
if (hostname.substring(0, 4) === 'www.') {
  hostname = hostname.substring(4);
}

var currentSession = { start: Date.now() };

// listen for changes to a page's visibility.
// when a page loses visibility send the session data to the background script
// when a page becomes visibile start a new session
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === 'visible') {
    currentSession = { start: Date.now() };
  } else {
    currentSession.end = Date.now();
    chrome.runtime.sendMessage({ from: hostname, session: currentSession }, function(response) {
      console.log('message response:', response);
      currentSession = { };
    });
  }
});
