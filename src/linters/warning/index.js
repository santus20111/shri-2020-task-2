let lintWarningTextSize = require('./text-size')
let lintWarningButtonSize = require('./button-size')
let lintButtonBeforePlaceholder = require('./button-placeholder')
let lintPlaceholderSize = require('./placeholder-size')

let lint = (nodes) => {
    let errors = []
    errors.push(...lintWarningTextSize(nodes))
    errors.push(...lintWarningButtonSize(nodes))
    errors.push(...lintButtonBeforePlaceholder(nodes))
    errors.push(...lintPlaceholderSize(nodes))

    return errors
}

module.exports = lint
