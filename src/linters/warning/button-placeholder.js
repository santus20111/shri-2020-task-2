let lint = (structureNode, buttonsInWarning = []) => {
    let errors = []

    let buildError = (loc) => {
        return {
            code: "WARNING.INVALID_BUTTON_POSITION",
            error: "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",
            location: {
                start: {column: loc.start.column, line: loc.start.line},
                end: {column: loc.end.column, line: loc.end.line}
            }
        }
    }

    if (structureNode.isBlock &&
        structureNode.blockName === 'button' &&
        structureNode.parent !== null &&
        structureNode.parent.isBlock &&
        structureNode.parent.blockName === 'warning') {
        buttonsInWarning.push(structureNode)
    } else if (structureNode.isBlock && structureNode.blockName === 'placeholder') {
        for (let buttonNode of buttonsInWarning) {
            errors.push(buildError(buttonNode.loc))
        }
    }

    for (let child of structureNode.children) {
        errors.push(...lint(child, buttonsInWarning))
    }

    return errors
}

module.exports = lint
