let lintFunctionalOffers = require('./functional-offer')

let lint = (structureNode) => {
    let errors = []
    errors.push(...lintFunctionalOffers(structureNode))
    return errors
}

module.exports = lint
