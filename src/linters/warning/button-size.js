let lint = (structureNode) => {
    let sizes = ['s', 'm', 'l', 'xl', 'xxl']
    let errors = []

    let buildError = (loc) => {
        return {
            code: "WARNING.INVALID_BUTTON_SIZE",
            error: "Размер блока button должен быть на 1 шаг больше эталонного",
            location: {
                start: {column: loc.start.column, line: loc.start.line},
                end: {column: loc.end.column, line: loc.end.line}
            }
        }
    }

    let filteredTextBlocks = structureNode.children
        .filter(child => child.isBlock && child.blockName === 'text')

    let firstTextBlockSize = null
    if (filteredTextBlocks.length > 0) {
        firstTextBlockSize = filteredTextBlocks[0]
            .mods
            .filter(mod => mod.key === 'size')[0]
            .value
    }


    for (let child of structureNode.children) {
        if (structureNode.isBlock && structureNode.blockName === 'warning') {
            if (child.isBlock && child.blockName === 'button') {

                let buttonSize = child.mods.filter(mod => mod.key === 'size')[0].value

                if (sizes.indexOf(buttonSize) - sizes.indexOf(firstTextBlockSize) !== 1) {
                    errors.push(buildError(child.loc))
                }
            }
        }

        errors.push(...lint(child, errors))
    }

    return errors
}

module.exports = lint
