let lint = (structureNode) => {
    let errors = []

    let buildError = (loc) => {
        return {
            code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
            error: "Тексты в блоке warning-text должны быть одного размера",
            location: {
                start: {column: loc.start.column, line: loc.start.line},
                end: {column: loc.end.column, line: loc.end.line}
            }
        }
    }

    let sizeSet = new Set();


    for (let child of structureNode.children) {
        if (structureNode.isBlock && structureNode.blockName === 'warning') {
            if (child.isBlock && child.blockName === 'text') {
                let sizeMods = child.mods.filter(mod => mod.key === 'size')

                if (sizeMods.length === 0) {
                    errors.push([buildError(structureNode.loc)])
                } else {
                    sizeSet.add(sizeMods[0].value)
                }
            }
        }

        errors.push(...lint(child, errors))
    }

    if (sizeSet.size > 1) {
        errors.push(buildError(structureNode.loc))
    }

    return errors
}

module.exports = lint
