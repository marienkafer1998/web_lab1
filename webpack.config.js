// webpack.config.js

module.exports = {
    // This is the "main" file which should include all other modules
    entry: './index.js',
    // Where should the compiled file go?
    output: {
        filename: 'bundle.js'
    },
    module: {
        // Special compilation rules
        loaders: [
            {
                // Ask webpack to check: If this file ends with .js, then apply some transforms
                test: /\.js$/,
                // Transform it with babel
                loader: 'babel-loader',
                // don't transform node_modules folder (which don't need to be compiled)
                exclude: /node_modules/,
            }
        ]
    },
    devServer: {
        port: 3005
    },
    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js'
        }
    }
};