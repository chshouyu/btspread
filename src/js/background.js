chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return {
        cancel: true
    };
}, {
    urls: [
        "http://www.btspread.com/script/jquery.popunder/0.2.27/jquery.popunder.min.js",
        "http://www.btspread.com/script/jquery.admanager/1.0.0/jquery.admanager.min.js"
    ]
}, ["blocking"]);