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

    for (let child of structureNode.children) {
        if (structureNode.isBlock && structureNode.blockName === 'warning') {
            if (child.isBlock && child.blockName === 'placeholder') {

                if (sizes.indexOf(child.mods.size) === -1) {
                    errors.push(buildError(child.loc))
                }
            }
        }

        errors.push(...lint(child, errors))
    }

    return errors
}

module.exports = initLint
