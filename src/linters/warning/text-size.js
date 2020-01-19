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
            code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
            error: "Тексты в блоке warning-text должны быть одного размера",
            location: {
                start: {column: loc.start.column, line: loc.start.line},
                end: {column: loc.end.column, line: loc.end.line}
            }
        }
    }


    if (!structureNode.isElem && structureNode.blockName === 'warning') {
        let sizeSet = new Set();

        collectTexts(structureNode)
            .filter(textNode => textNode.mods.size)
            .map(textNode => textNode.mods.size)
            .forEach(textSize => {
                sizeSet.add(textSize)
            })


        if (sizeSet.size > 1) {
            errors.push(buildError(structureNode.loc))
        }
    }

    for (let child of structureNode.children) {

        errors.push(...lint(child, errors))
    }

    return errors
}

let collectTexts = (structureNode) => {
    let texts = []

    if (!structureNode.isElem && structureNode.blockName === 'text') {
        texts.push(structureNode)
    }

    for (let child of structureNode.children) {
        texts.push(...collectTexts(child))
    }
    return texts
}

module.exports = initLint
