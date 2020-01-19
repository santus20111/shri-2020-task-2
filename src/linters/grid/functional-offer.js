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
            code: "GRID.TOO_MUCH_MARKETING_BLOCKS",
            error: "Маркетинговые блоки не должны занимать больше половины от всех колонок",
            location: {
                start: {column: loc.start.column, line: loc.start.line},
                end: {column: loc.end.column, line: loc.end.line}
            }
        }
    }

    let marketingBlocks = ['commercial', 'offer']

    if (structureNode.blockNames.indexOf('grid') !== -1 && !structureNode.isElem) {

        let gridColumns = +structureNode.mods['m-columns']

        let marketingColumns = 0

        structureNode.children.forEach(child => {
            if (child.blockNames.indexOf('grid') !== -1 && child.elemNames.indexOf('fraction') !== -1) {
                let columns = +child.elemMods['m-col']

                if (marketingBlocks.indexOf(child.children[0].blockNames[0]) !== -1) {
                    marketingColumns += columns
                }
            }
        })

        if (gridColumns/2 <= marketingColumns) {
            errors.push(buildError(structureNode.loc))
        }
    }

    for (let child of structureNode.children) {
        errors.push(...lint(child))
    }

    return errors
}

module.exports = initLint

