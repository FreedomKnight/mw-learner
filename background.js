contextMenuOption = {
    title: "Search on Merriam-Webster's Learner",
    contexts: ["selection"],
    onclick(info) {
        chrome.tabs.create({url: `http://www.learnersdictionary.com/definition/${info.selectionText}`})
    }
}

chrome.contextMenus.create(contextMenuOption)
