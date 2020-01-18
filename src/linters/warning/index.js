let lintWarningTextSize = require('./test-size')
let lintWarningButtonSize = require('./button-size')

let lint = (structureNode) => {
    let errors = []
    if (structureNode.isBlock && structureNode.blockName === 'warning') {
        errors.push(...lintWarningTextSize(structureNode))
        errors.push(...lintWarningButtonSize(structureNode))
    }
    return errors
}

module.exports = lint
