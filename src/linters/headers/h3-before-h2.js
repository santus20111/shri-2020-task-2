let initLint = (nodes) => {
    let errors = []
    let stack = []

    nodes.forEach(node => {
        errors.push(...lint(node, stack, 1))
    })
    return errors
}

let lint = (structureNode) => {
    let errors = []

    let buildError = (loc) => {
        return {
            code: "TEXT.INVALID_H3_POSITION",
            error: "Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности",
            location: {
                start: {column: loc.start.column, line: loc.start.line},
                end: {column: loc.end.column, line: loc.end.line}
            }
        }
    }

    if (structureNode.blockNames.indexOf('text') !== -1 &&
        structureNode.mods.type === 'h3' &&
        structureNode.next) {
        let h2NextNodes = []

        let currentNode = structureNode
        while(currentNode.next) {
            h2NextNodes.push(...collectH2Nodes(currentNode.next))
            currentNode = currentNode.next
        }

        if(h2NextNodes.length > 0) {
            errors.push(buildError(structureNode.loc))
        }
    }

    structureNode.children.forEach(child => {
        errors.push(...lint(child))
    })
    return errors
}

let collectH2Nodes = (structureNode) => {
    let nodes = []

    if (structureNode.blockNames.indexOf('text') !== -1 &&
        structureNode.mods.type === 'h2') {
        nodes.push(structureNode)
    }

    structureNode.children.forEach(child => {
        nodes.push(...collectH2Nodes(child))
    })

    return nodes
}

module.exports = initLint
