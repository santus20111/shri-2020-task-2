let lintH1Several = require('./h1-several')

let lint = (nodes) => {
    let errors = []
    errors.push(...lintH1Several(nodes))
    return errors
}

module.exports = lint
