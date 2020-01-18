let lintWarningTextSize = require('./test-size')
let lintWarningButtonSize = require('./button-size')
let lintButtonBeforePlaceholder = require('./button-placeholder')
let lintPlaceholderSize = require('./placeholder-size')

let lint = (structureNode) => {
    let errors = []
    errors.push(...lintWarningTextSize(structureNode))
    errors.push(...lintWarningButtonSize(structureNode))
    errors.push(...lintButtonBeforePlaceholder(structureNode))
    errors.push(...lintPlaceholderSize(structureNode))

    return errors
}

module.exports = lint
