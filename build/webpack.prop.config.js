const uglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const merge = require('webpack-merge');
const common = require('./webpack.base.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const package = require('../package.json')

module.exports = merge.merge(common, {
    entry: {
        bundle: './src/index.js',
        // 获取 dependencies 依赖的库，并抽离成单独的文件 vendor.js
        // 将 vue 、element-ui单独抽离
        vendor: ['vue' , 'element-ui' , 'less' , 'vue-router' , 'vuex' ],
    },
    output: {
        filename: '[name].js',
        // path: path.resolve(__dirname, 'dist'), // 打包在当前目录
        path: path.resolve("", 'dist'),
    },
    plugins: [
        // 压缩打包代码
        new uglifyJsWebpackPlugin(),
        // 清空特定文件夹
        new CleanWebpackPlugin(),
        // 拷贝静态资源
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../src/assets'),
            to: path.resolve(__dirname, '../dist/assets'),
            // from: '../src/assets',
            // to: '../dist'
        }]),
        new ExtractTextPlugin("style.css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor-vue" , 'vendor-ele' , 'vendor-less' , 'vendor-vue-router' , 'vendor-vuex' ],
            filename: "[name].js",
            // chunks: "bandle"
        }),
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                // 提取css文件
                fallback: "style-loader",
                // 编译css文件
                use: "css-loader",
            })
        }, ]
    }
})