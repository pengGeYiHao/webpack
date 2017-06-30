const webpack =require('webpack')
const path =require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const SpritesmithPlugin = require('webpack-spritesmith')
const WebpackChunkHash = require("webpack-chunk-hash")
const ManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const Merge = require('webpack-merge')
const CommonConfig = require('./webpack.common.js')


const srcPath = path.resolve(__dirname,'..', 'src')

function resolve(dir) {
  return path.resolve(srcPath, dir)
}
let pathsToClean = [
  'dist'
]
let cleanOptions = {
  root:path.resolve(__dirname,'..'),
  exclude:[ 'files', 'to', 'ignore' ],
  verbose: true,
  watch:false,
  dry:false
}
module.exports = Merge(CommonConfig,{
    output:{
        filename:'[name].[chunkhash].js',
        path:path.resolve(__dirname,'..','dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader?minimize'
                })
            },
            {
                test: /\.scss$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                            {
                                loader:'css-loader?minimize'
                            },
                            {
                                loader:'sass-loader'
                            }
                        ]
                })
            }
        ]
    },
    plugins :[
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        
        new webpack.optimize.CommonsChunkPlugin({
            name:['vendor','manifest'],
            nimChunks:Infinity
        }),
        new HtmlWebpackPlugin({
            template:srcPath+'/template.html'
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                warnings: false,
                drop_console: true,
                collapse_vars: true,
                reduce_vars: true,
            }
        }),
        new webpack.HashedModuleIdsPlugin(),
        new WebpackChunkHash(),
        new ChunkManifestPlugin({
            filename: "chunk-manifest.json",
            manifestVariable: "webpackManifest",
            inlineManifest: true
        }),
        new CopyWebpackPlugin([
            {
                from:'src/images',
                to:'images'
            }
        ]),
        new ImageminPlugin({ test: 'images/*' }),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname,'..', 'src/spritesImg'),
                glob: '*.*'
            },
            target: {
                image: path.resolve(__dirname,'..', 'src/images/sprite.png'),
                css: path.resolve(__dirname,'..', 'src/style/mixins/sprite.scss')
            },
            apiOptions: {
                cssImageRef: "../images/sprite.png"
            },
            spritesmithOptions: {
                algorithm: 'left-right'
            }
        }),
        new ExtractTextPlugin("[name].[chunkhash].css"),
    ]
})