let initLint = (nodes) => {
    let errors = []
    nodes.forEach(node => {
        errors.push(...lint(node, [],1))
    })
    return errors
}

let lint = (structureNode, buttonsInWarning = [], depth) => {
    let errors = []

    let buildError = (loc) => {
        return {
            code: "WARNING.INVALID_BUTTON_POSITION",
            error: "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",
            location: {
                start: {column: loc.start.column, line: loc.start.line},
                end: {column: loc.end.column, line: loc.end.line}
            }
        }
    }

    if (structureNode.isBlock &&
        structureNode.blockName === 'button' &&
        structureNode.parent !== null &&
        structureNode.parent.isBlock &&
        structureNode.parent.blockName === 'warning') {
        buttonsInWarning.push({depth: depth, node: structureNode})
    } else if (structureNode.isBlock && structureNode.blockName === 'placeholder') {
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
