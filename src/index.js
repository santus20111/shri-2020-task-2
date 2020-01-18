let lintWarning = require('./linters/warning/index')
let lintGrid = require('./linters/grid/index')
let lintHeaders = require('./linters/headers/index')

const parse = require('json-to-ast');

let lint = (jsonString) => {
    let rootStructures = getStructure(parse(jsonString))
    let errors = []

    errors.push(...lintWarning(rootStructures))
    errors.push(...lintGrid(rootStructures))
    errors.push(...lintHeaders(rootStructures))


    return clearErrorDuplicates(errors)
}

if (global) {
    global.lint = lint
} else if (window) {
    window.lint = lint
}

module.exports = lint

let clearErrorDuplicates = (errors) => {
    let reduced = errors.reduce((total, error) => {
        let key = `${error.code}:${error.location.start.column}:${error.location.start.line}:${error.location.end.column}:${error.location.end.line}`
        if (!total[key]) {
            total[key] = error
        }
        return total
    }, {})

    let reducedErrors = []
    for (let [key, error] of Object.entries(reduced)) {
        reducedErrors.push(error)
    }
    return reducedErrors
}

let getStructure = (astNode, parent = null) => {
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

        let mods = {}
        astNode.children
            .filter(node => node.type === 'Property' && node.key.value === 'mods')
            .forEach(modNodeProp => {
                modNodeProp.value.children.forEach(modNode => {
                    mods[modNode.key.value] = modNode.value.value
                })
            })

        let elemMods = {}
        astNode.children
            .filter(node => node.type === 'Property' && node.key.value === 'elemMods')
            .forEach(modNodeProp => {
                modNodeProp.value.children.forEach(modNode => {
                    elemMods[modNode.key.value] = modNode.value.value
                })
            })


        let returnValue = {
            isBlock,
            isElem,
            blockName,
            elemName,
            children: [],
            mods,
            elemMods,
            parent,
            loc: astNode.loc,
        }

        let contentNodes = astNode.children
            .filter(node => node.type === 'Property' && node.key.value === 'content')
        if (contentNodes.length > 0) {
            returnValue.children = getStructure(contentNodes[0].value, returnValue)
        }

        return [returnValue]

    } else if (astNode.type === 'Array') {
        return astNode.children.map(node => getStructure(node, parent)[0])
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
