const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPluginCopy = require('webpack-plugin-copy');

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
        ),
        new WebpackPluginCopy([{from: 'config.json', to: 'config.json'}, {from: '*.ogg'}])
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