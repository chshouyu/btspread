chrome.contextMenus.onClicked.addListener(function(info, tab) {

    if (info.menuItemId === 'btspread') {
        var openUrl = 'http://www.btspread.com/search/' + encodeURIComponent(info.selectionText);
        chrome.tabs.query({
            url: 'http://www.btspread.com/search/*'
        }, function(tabs) {
            if (tabs.length > 0) {
                chrome.tabs.update(tabs[0].id, {
                    url: openUrl,
                    active: true
                });
            } else {
                chrome.tabs.create({
                    url: openUrl
                });
            }
        });
    }
});

chrome.contextMenus.create({
    "title": "使用btspread搜索 \"%s\"",
    "contexts": ["selection"],
    "id": "btspread"
});