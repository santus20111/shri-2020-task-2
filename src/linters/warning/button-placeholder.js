let lint = (structureNode, buttonsInWarning = []) => {
    let errors = []

    let buildError = (loc) => {
        return {
            code: "WARNING.INVALID_PLACEHOLDER_SIZE",
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
        buttonsInWarning.push(structureNode)
    } else if (structureNode.isBlock && structureNode.blockName === 'placeholder') {
        for (let buttonNode of buttonsInWarning) {
            errors.push(buildError(buttonNode.loc))
        }
    }

    for (let child of structureNode.children) {
        errors.push(...lint(child, buttonsInWarning))
    }

    return errors
}

module.exports = lint

let getBeforeWarningButtonNodes = (node) => {
    return getParentNodes(node)
        .filter(iterNode =>
            iterNode.parent !== node &&
            iterNode.parent.isBlock &&
            iterNode.parent.blockName === 'warning' &&
            iterNode.isBlock &&
            iterNode.blockName === 'button'
        )
}

let getParentNodes = (node) => {
    let nodes = []

    for (let i = 0; i < node.children.length - 1; i++) {
        nodes.push(...getChildrenNodes(node.children[i]))
    }
    if (node.parent !== null) {
        nodes.push(...getParentNodes(node.parent))
    }

    return nodes
}
let getChildrenNodes = (node) => {
    if (node.children.length === 0) {
        return node.children
    }

    let nodes = []
    node.children.forEach(child => {
        nodes.push(...getChildrenNodes(child))
    })
    return nodes
}

let getAllNodesFrom
