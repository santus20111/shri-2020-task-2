module.exports = {
    mode: 'production',
    context: __dirname,
    devtool: "source-map",
    entry: "./src/index.js",
    output: {
        path: __dirname + "/build",
        filename: "linter.js"
    },
}
