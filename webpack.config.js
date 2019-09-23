const path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    context: __dirname,
    entry: './assets/js/index.jsx',
    output: {
        publicPath: `http://localhost:9000/static/dist/`,
        pathinfo: true
    },
    module: {
        rules: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    'postcss-loader',

                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    'postcss-loader',

                ],
            },
            {
                test: /\.svg$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'file-loader',
                    // Translates CSS into CommonJS

                ],
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin(),
        new BundleTracker({ filename: `./webpack-stats.json`, logTime: true })
    ],
    devServer: {
        compress: true,
        hot: true,
        host: "0.0.0.0",
        port: 9000,
        headers: { "Access-Control-Allow-Origin": "*" },
        disableHostCheck: true,
        historyApiFallback: true,

        stats: {
            warnings: false
        }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css']
    }

};

