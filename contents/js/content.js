let key = '1cca9994-b63a-46df-8c7a-4e129208f5ab'
let client = axios.create({
    baseURL: 'https://www.dictionaryapi.com/api/v1/references/learners/xml/',
    params: { key }
})

let definitionTooltip = document.createElement('div')
definitionTooltip.setAttribute('class', 'definition-tooltip')
document.body.appendChild(definitionTooltip)

document.addEventListener('mousedown', function (e) {
    definitionTooltip.style.visibility = 'hidden';
}, false);

document.addEventListener('mouseup', async (e) => {
    let selected = getSelection().toString()
    if (selected) {
        let { data, status } = await client.get(selected)
        let defination = (new DOMParser()).parseFromString(data, 'text/xml')
        showDefination(e.pageX + 20, e.pageY + 20, defination)
    }
})

let showDefination = (x, y, definition) => {
    let html = Array.from(definition.querySelectorAll('entry')).map((entry) => {
        let text = (element, tag) => {
            return entry.querySelector(tag).innerHTML
        }

        return `
            <div>
                <span>${text(entry, 'hw')}</span>
                <span>/${text(entry, 'pr')}/</span>
                <span>${text(entry, 'fl')}</span>
            <div>
        `
    }).reduce((prev, current) => { return prev + current }, '')

    console.log(html)
    definitionTooltip.innerHTML = html
    definitionTooltip.style.left = `${x}px` 
    definitionTooltip.style.top = `${y}px` 
    definitionTooltip.style.visibility = 'visible'
}
