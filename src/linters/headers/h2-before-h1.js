let initLint = (nodes) => {
    let errors = []
    let stack = []

    nodes.forEach(node => {
        errors.push(...lint(node, stack, 1))
    })
    return errors
}

let lint = (structureNode, buttonsInWarning = [], depth) => {
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
        structureNode.mods.type === 'h2') {
        buttonsInWarning.push({depth: depth, node: structureNode})
    } else if (structureNode.blockName === 'text' &&
        structureNode.mods.type === 'h1') {
        for (let buttonNode of buttonsInWarning) {
            if (depth <= buttonNode.depth) {
                errors.push(buildError(buttonNode.node.loc))
            }
        }
    }

    for (let child of structureNode.children) {
        errors.push(...lint(child, buttonsInWarning, depth + 1))
    }

    return errors
}

module.exports = initLint
