const webpack =require('webpack')
const path =require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const srcPath = path.resolve(__dirname,'..', 'src')

function resolve(dir) {
  return path.resolve(srcPath, dir)
}

module.exports = {
    entry:{
        app:srcPath+'/index.js',
        vendor:['react','react-dom','react-router','react-redux','redux']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|PNG)$/,
                loaders: 'url-loader?limit=2500&name=images/[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json'],
        modules: [srcPath, 'node_modules'],
        alias: {
            'COMPONENT': resolve('components'),
            'STYLE':resolve('style'),
            'IMAGE':resolve('images')
        }
    },
    plugins:[
        new webpack.ProvidePlugin({
            React:'react',
            ReactDom:'react-dom'
        }),
    ]
}