let lintWarning = require('./linters/warning/index')
const parse = require('json-to-ast');

let lint = (jsonString) => {
    let rootStructures = getStructure(parse(jsonString))
    let errors = []

    rootStructures.forEach(structure => {
        errors.push(...lintWarning(structure, errors))
    })
    return errors
}

if(global) {
    global.lint = lint
} else if(window) {
    window.lint = lint
}

module.exports = lint

let getStructure = (astNode) => {
    if (astNode.type === 'Object') {
        let isBlock = astNode.children
            .filter(node => node.type === 'Property' && node.key.value === 'block').length > 0
        let isElem = astNode.children
            .filter(node => node.type === 'Property' && node.key.value === 'elem').length > 0

        let blockName = null;
        if (isBlock) {
            blockName = astNode.children
                .filter(node => node.type === 'Property' && node.key.value === 'block')[0].value.value
        }

        let elemName = null;
        if (isElem) {
            elemName = astNode.children
                .filter(node => node.type === 'Property' && node.key.value === 'elem')[0].value.value
        }

        let children = []
        let contentNodes = astNode.children
            .filter(node => node.type === 'Property' && node.key.value === 'content')
        if (contentNodes.length > 0) {
            children = getStructure(contentNodes[0].value)
        }

        let mods = []
        let modsNodes = astNode.children
            .filter(node => node.type === 'Property' && node.key.value === 'mods')
        if (modsNodes.length > 0) {
            mods = modsNodes[0].value.children.map(modNode => {
                return {
                    key: modNode.key.value,
                    value: modNode.value.value
                }
            })
        }

        return [{
            isBlock,
            isElem,
            blockName,
            elemName,
            children,
            mods,
            loc: astNode.loc,
        }]
    } else if (astNode.type === 'Array') {
        return astNode.children.map(node => getStructure(node)[0])
    }
}

/*
console.log('Размер текста: 2 ошибки')
let json = `{
    "block": "warning-text",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "text", "mods": { "size": "m" } },
        {
            "block": "warning-text",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "text", "mods": { "size": "m" } }
            ]
        }
    ]
}`;

lint(json)


console.log('Размер кнопки: 0 ошибок')
json = `{
    "block": "warning-text",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "xl" } }
    ]
}`
lint(json)

console.log('Размер кнопки: 1 ошибка')
json = `{
    "block": "warning-text",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "s" } }
    ]
}`
lint(json)
*/
