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

                let placeholderSizeOptional = child.mods.filter(mod => mod.key === 'size')

                if (placeholderSizeOptional.length > 0 && sizes.indexOf(placeholderSizeOptional[0].value) === -1) {
                    errors.push(buildError(child.loc))
                }
            }
        }

        errors.push(...lint(child, errors))
    }

    return errors
}

module.exports = lint
