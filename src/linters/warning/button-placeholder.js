let initLint = (nodes) => {
    let errors = []
    nodes.forEach(node => {
        errors.push(...lint(node))
    })
    return errors
}

let lint = (structureNode) => {
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

    if (!structureNode.isElem &&
        structureNode.blockName === 'button' &&
        structureNode.parent !== null &&
        !structureNode.parent.isElem &&
        structureNode.parent.blockName === 'warning' &&
        structureNode.next) {

        let placeholderNodes = []

        let currentNode = structureNode
        while(currentNode.next) {
            placeholderNodes.push(...collectPlaceholders(currentNode.next))
            currentNode = currentNode.next
        }

        if(placeholderNodes.length > 0) {
            errors.push(buildError(structureNode.loc))
        }
    }

    for (let child of structureNode.children) {
        errors.push(...lint(child))
    }

    return errors
}

let collectPlaceholders = (structureNode) => {
    let nodes = []
    if (!structureNode.isElem && structureNode.blockName === 'placeholder') {
        nodes.push(structureNode)
    }

    for (let child of structureNode.children) {
        nodes.push(...collectPlaceholders(child))
    }

    return nodes
}

module.exports = initLint
