contextMenuOption = {
    title: "Search '%s' on Merriam-Webster Learner's Dictionary",
    contexts: ["selection"],
    onclick(info) {
        chrome.tabs.create({url: `http://www.learnersdictionary.com/definition/${info.selectionText}`})
    }
}

let contextMenu = chrome.contextMenus.create(contextMenuOption)
