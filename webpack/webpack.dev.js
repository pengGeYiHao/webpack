const webpack =require('webpack')
const path =require('path')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const Merge = require('webpack-merge')
const CommonConfig = require('./webpack.common.js')
const srcPath = path.resolve(__dirname,'..', 'src')

module.exports = Merge(CommonConfig,{
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'..','dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:[
                        {
                            loader:'style-loader'
                        },
                        {
                            loader:'css-loader'
                        }
                    ]
            },
            {
                test: /\.scss$/,
                use:[
                        {
                            loader:'style-loader'
                        },
                        {
                            loader:'css-loader'
                        },
                        {
                            loader:'sass-loader'
                        }
                    ]
            }
        ]
    },
    plugins :[
        new HtmlWebpackPlugin({
            template:srcPath+'/template.html'
        }),
        new OpenBrowserPlugin({
            url:'http://127.0.0.127:8085',
            browser:'chrome'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname,'..', "src"),
        compress: true,
        port: 8085,
        host:'127.0.0.127',
        inline:true,
    }
})