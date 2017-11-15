var storage = chrome.storage.local;

storage.get({
    'pageLang': 'auto',
    'userLang': 'zh-CN',
    'ttsLang': 'auto'
}, function (items) {
    var pageLang = items.pageLang,
        userLang = items.userLang,
        ttsLang = items.ttsLang;

    chrome.contextMenus.create({
        id: 'translatezhcn',
        title: chrome.i18n.getMessage('contextMenuTitleTranslate', [pageLang, 'zh-CN']),
        contexts: ['selection']
    });
    chrome.contextMenus.create({
        id: 'translateen',
        title: chrome.i18n.getMessage('contextMenuTitleTranslate', [pageLang, 'en']),
        contexts: ['selection']
    });

});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    var selectedText = info.selectionText;

    if (info.menuItemId == 'translatezhcn') {
        storage.get({
            'translateURL': 'https://translate.google.com/#auto/zh-CN/'
        }, function (item) {
            chrome.windows.create({
                url: item.translateURL + encodeURIComponent(selectedText),
                type: "popup",
                width: 1000,
                height: 500
            });
        });
    }
    if (info.menuItemId == 'translateen') {
        storage.get({
            'translateURL': 'https://translate.google.com/#auto/en/'
        }, function (item) {
            chrome.windows.create({
                url: item.translateURL + encodeURIComponent(selectedText),
                type: "popup",
                width: 1000,
                height: 500
            });
        });
    }

});
