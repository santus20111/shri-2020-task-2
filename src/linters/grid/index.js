let lintFunctionalOffers = require('./functional-offer')

let lint = (nodes) => {
    let errors = []
    errors.push(...lintFunctionalOffers(nodes))
    return errors
}

module.exports = lint
