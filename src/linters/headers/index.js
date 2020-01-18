let lintH1Several = require('./h1-several')
let lintH2BeforeH1 = require('./h2-before-h1')
let lintH3BeforeH2 = require('./h3-before-h2')

let lint = (nodes) => {
    let errors = []
    errors.push(...lintH1Several(nodes))
    errors.push(...lintH2BeforeH1(nodes))
    errors.push(...lintH3BeforeH2(nodes))

    return errors
}

module.exports = lint
