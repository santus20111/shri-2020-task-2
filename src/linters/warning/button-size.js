let initLint = (nodes) => {
    let errors = []
    nodes.forEach(node => {
        errors.push(...lint(node))
    })
    return errors
}

let lint = (structureNode) => {
    let sizes = ['xxxxxs', 'xxxxs', 'xxxs', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl']
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

/*    let filteredTextBlocks = structureNode.children
        .filter(child => child.isBlock && child.blockName === 'text')

    let firstTextBlockSize = null
    if (filteredTextBlocks.length > 0) {
        firstTextBlockSize = filteredTextBlocks[0].mods.size
    }*/

    if (!structureNode.isElem && structureNode.blockName === 'warning') {
        let texts = collectTexts(structureNode)
        let buttons = collectButtons(structureNode)
        if (texts.length > 0) {
            let textSize = texts[0].mods.size
            buttons.forEach(button => {
                let buttonSize = button.mods.size
                if (sizes.indexOf(textSize) !== -1 &&
                    sizes.indexOf(buttonSize) !== -1 &&
                    sizes.indexOf(buttonSize) - sizes.indexOf(textSize) !== 1) {
                    errors.push(buildError(button.loc))
                }
            })
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

let collectButtons = (structureNode) => {
    let texts = []

    if (!structureNode.isElem && structureNode.blockName === 'button') {
        texts.push(structureNode)
    }

    for (let child of structureNode.children) {
        texts.push(...collectButtons(child))
    }
    return texts
}

module.exports = initLint
