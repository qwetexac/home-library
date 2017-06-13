var webpack = require('webpack');

module.exports = {
    entry: ["babel-polyfill", "./src/index.js"],
    output: {
        path: __dirname + '/public/',
        publicPath: "public/",
        filename: "bundle.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
           handlebars: 'handlebars/dist/handlebars.min.js'
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/]
            },
            { test: /\.(scss|sass)$/, loader: "style-loader!css-loader!autoprefixer-loader!sass-loader"},
            { test: /\.html$/, loader: "html-loader" },
            { test: /\.json$/, loader: "json-loader" }
        ]
    },
}