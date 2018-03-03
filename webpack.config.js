const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: ['./src/js/index.jsx'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 1000
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                filename: 'index.html',
                template: './src/template/index.html'
            }
        )
    ],
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_module/,
            include: [path.join(__dirname, '/src/js')],
            loader: ['babel-loader']
        },
        {
            test: /\.css$/,
            loader: ['style-loader', 'css-loader']
        }]
    }
}

module.exports = config;