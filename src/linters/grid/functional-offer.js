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
    let functionalBlocks = ['payment', 'warning', 'product', 'history', 'cover', 'collect', 'articles', 'subscribtion', 'event']
    if (structureNode.blockName === 'grid' && !structureNode.isElem) {

        let gridColumns = structureNode.mods.filter(mod => mod.key === 'm-columns')[0].value
        let marketingColumns = 0

        structureNode.children.forEach(child => {
            if (child.blockName === 'grid' && child.elemName === 'fraction') {
                let columns = +child.elemMods.filter(mod => mod.key === 'm-col')[0].value
                if (marketingBlocks.indexOf(child.children[0].blockName) !== -1) {
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

