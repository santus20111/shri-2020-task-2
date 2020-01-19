let initLint = (nodes) => {
    let errors = []
    nodes.forEach(node => {
        errors.push(...lint(node))
    })
    return errors
}

let lint = (structureNode) => {
    let sizes = ['s', 'm', 'l']
    let errors = []

    let buildError = (loc) => {
        return {
            code: "WARNING.INVALID_PLACEHOLDER_SIZE",
            error: "Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l",
            location: {
                start: {column: loc.start.column, line: loc.start.line},
                end: {column: loc.end.column, line: loc.end.line}
            }
        }
    }

    if (!structureNode.isElem &&
        (structureNode.blockNames.indexOf('warning') !== -1 || structureNode.blockNames.indexOf('warning-text') !== -1)) {
        let placeholders = collectPlaceholders(structureNode);
        placeholders.forEach(placeholder => {
            if(sizes.indexOf(placeholder.mods.size) === -1) {
                errors.push(buildError(placeholder.loc))
            }
        })
    }

    for (let child of structureNode.children) {
        errors.push(...lint(child, errors))
    }

    return errors
}

let collectPlaceholders = (structureNode) => {
    let nodes = []
    if (!structureNode.isElem && structureNode.blockNames.indexOf('placeholder') !== -1) {
        nodes.push(structureNode)
    }

    for (let child of structureNode.children) {
        nodes.push(...collectPlaceholders(child))
    }

    return nodes
}

module.exports = initLint
