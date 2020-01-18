module.exports = (structureNode) => {
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
        if (child.isBlock && child.blockName === 'text') {
            let sizeMods = child.mods.filter(mod => mod.key === 'size')

            if (sizeMods.length === 0) {
                return [buildError(structureNode.loc)]
            } else {
                sizeSet.add(sizeMods[0].value)
            }
        }
    }

    if (sizeSet.size > 1) {
        return [buildError(structureNode.loc)]
    }
    return []
}
