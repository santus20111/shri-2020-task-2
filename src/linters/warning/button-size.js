module.exports = (structureNode) => {
    let sizes = ['s', 'm', 'l', 'xl', 'xxl']
    let errors = []

    let buildError = (loc) => {
        return {
            code: "WARNING.INVALID_PLACEHOLDER_SIZE",
            error: "Размер блока button должен быть на 1 шаг больше эталонного",
            location: {
                start: {column: loc.start.column, line: loc.start.line},
                end: {column: loc.end.column, line: loc.end.line}
            }
        }
    }

    let firstTextBlockSize = structureNode.children
        .filter(child => child.isBlock && child.blockName === 'text')[0]
        .mods
        .filter(mod => mod.key === 'size')[0]
        .value

    for (let child of structureNode.children) {
        if (child.isBlock && child.blockName === 'button') {

            let buttonSize = child.mods.filter(mod => mod.key === 'size')[0].value

            if(sizes.indexOf(buttonSize) - sizes.indexOf(firstTextBlockSize) !== 1) {
                errors.push(buildError(child.loc))
                return errors
            }
        }
    }
    return errors
}
