var hostname = window.location.hostname;
if (hostname.substring(0, 4) === 'www.') {
  hostname = hostname.substring(4);
}

const MILLISECONDS_IN_13_DAYS = 1000 * 60 * 60 * 24 * 13;

var currentSession = { start: Date.now() };

// listen for changes to a page's visibility.
// when a page loses visibility send the session data to the background script
// when a page becomes visibile start a new session
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === 'visible') {
    currentSession = { start: Date.now() };
  } else {
    const end = Date.now();
    currentSession.end = end;
    const today = new Date();
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const validUntil = tomorrow.getTime() + MILLISECONDS_IN_13_DAYS;
    currentSession.validUntil = validUntil;
    chrome.runtime.sendMessage({ from: hostname, origin: window.location.origin, session: currentSession }, function(response) {
      currentSession = {};
    });
  }
});
