let initLint = (nodes) => {
    let buildError = (loc) => {
        return {
            code: "TEXT.SEVERAL_H1",
            error: "Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.",
            location: {
                start: {column: loc.start.column, line: loc.start.line},
                end: {column: loc.end.column, line: loc.end.line}
            }
        }
    }

    let errors = []

    let h1Nodes = []

    nodes.forEach(node => {
        collectH1Nodes(node, h1Nodes)
    })

    if(h1Nodes.length > 1) {
        for(let i = 0;i < h1Nodes.length;i++) {
            errors.push(buildError(h1Nodes[i].loc))
        }
    }

    return errors
}

let collectH1Nodes = (structureNode, h1Nodes) => {
    let errors = []

    if(structureNode.blockName === 'text' &&
        structureNode.mods.type === 'h1') {
        h1Nodes.push(structureNode)
    }

    for (let child of structureNode.children) {
        collectH1Nodes(child, errors)
    }

    return errors
}

module.exports = initLint
