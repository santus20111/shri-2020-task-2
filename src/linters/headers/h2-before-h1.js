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
            code: "TEXT.INVALID_H2_POSITION",
            error: "Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности",
            location: {
                start: {column: loc.start.column, line: loc.start.line},
                end: {column: loc.end.column, line: loc.end.line}
            }
        }
    }

    if (structureNode.blockName === 'text' &&
        structureNode.mods.type === 'h2' &&
        structureNode.next) {
        if(collectH1Nodes(structureNode.next).length > 0) {
            errors.push(buildError(structureNode.loc))
        }
    }

    structureNode.children.forEach(child => {
        errors.push(...lint(child))
    })
    return errors
}

let collectH1Nodes = (structureNode) => {
    let nodes = []

    if (structureNode.blockName === 'text' &&
        structureNode.mods.type === 'h1') {
        nodes.push(structureNode)
    }

    structureNode.children.forEach(child => {
        nodes.push(...collectH1Nodes(child))
    })

    return nodes
}

module.exports = initLint
