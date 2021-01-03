
// TODO:FIX
// after installing the extension, the content script isn't added to a tab until it has been refreshed
// if a user views an existing tab without refreshing no time tracking can occur

// setup local storage to hold page sessions
chrome.runtime.onInstalled.addListener(function() {
    localStorage.setItem('sessions', JSON.stringify({}));
});


// receives sessions from pages that contain the content script
// and stores them in the extension's local storage
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        try {
            var sessions = JSON.parse(localStorage.getItem('sessions'));
            if (!sessions[request.from]) {
                sessions[request.from] = { sessions: [] };
            }
            sessions[request.from].sessions.push(request.session);
    
            localStorage.setItem('sessions', JSON.stringify(sessions));
            sendResponse('session added');
        } catch (e) {
            sendResponse('error recording session');
        }
    }
);