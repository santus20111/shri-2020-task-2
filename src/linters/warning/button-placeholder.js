module.exports = (structureNode) => {
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
            }
        }
    }

    return errors
}
