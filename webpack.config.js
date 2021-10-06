module.exports = {
    entry: './app.vue',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        // Add `.ts` and `.vue` as a resolvable extension.
        extensions: ['', '.ts', '.vue']
    },
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.vue$/, loader: 'vue-loader' },
            { test: /\.tsx?$/, loader: 'vue-ts-loader' }
        ]
    },
    vue: {
        loaders: {
            ts: 'vue-ts-loader'
        },
        // important for cooperating with vue-loader
        esModule: true
    },
}