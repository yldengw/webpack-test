const path = require('path');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
const glob = require("glob");
const pruifyCssPlugin = require("purifycss-webpack");
const entry = require('./webpack_config/entry_webpack');
const webpack = require('webpack');
// var website = {
//     publicPath: 'http://127.0.0.1:8080'
// }
console.log(encodeURIComponent(process.env.type));
if(process.env.type=="build"){
    var website = {
        publicPath: 'https://127.0.0.1:8081/'
    }
}else{
    var website = {
        publicPath: ''
    }
}
module.exports = {
    devtool: 'eval-source-map',// 打包调试
    // 入口文件的配置项
    // entry:entry.path,
    entry: {
        entry: './src/entry.js',
        jquery:'jquery',
        vue:'vue'
        // entry2: './src/entry2.js'
    },
    // 出口文件的配置项
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath:website.publicPath
    },
    module: {
        rules:[
            {
                test:/\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader:'css-loader',options:{importLoaders :1}
                        // query:{
                        //     name: 'index.css'
                        // }
                    },'postcss-loader']
                  })
            },
            {
                test: /\.(png|jsp|gif)/,
                use: [{
                    loader:'file-loader',
                    // options: {
                    //     limit: 500000,
                    //     outputPath: '/images/'
                    // }
                    query:{
                        name: 'assets/[hash].[ext]'
                    }
                }]
            },
            {
                test: /\.(htm|html)$/i,
                 use:[ 'html-withimg-loader'] 
            },
            {
                test: /\.less$/,
                use:extractTextPlugin.extract({
                    use:[{
                        loader:'css-loader'
                    },{
                            loader:'less-loader'
                        }],
                    fallback:'style-loader'
                })
            },
            {
                test:/\.scss/,
                // use:[{
                //     loader:'style-loader'
                // },{
                //     loader:'css-loader'
                // },{
                //     loader:'sass-loader'
                // }]
                // sass文件分离，在index.css加入
                use: extractTextPlugin.extract({
                    use:[{ loader:'css-loader'},{loader:'sass-loader'}],
                    fallback:'style-loader'
                })
            },
            // babel 配置
            {
                test: /\.(jsx|js)$/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:[
                            "es2015","react"
                        ]
                    }
                },
                exclude:/node_modules/
            }
        ]
    },
    plugins: [
        // new UglifyJSPlugin(),// 打包js
        new htmlPlugin({
            template:'./index.html'
        }),// 打包html
        new extractTextPlugin('index.css'),
        // 打包删掉冗余的css
        new pruifyCssPlugin({
            paths:glob.sync(path.join(__dirname,'*.html'))
        }),
        //通过webpack自带的插件全局引入第三方库
        new webpack.ProvidePlugin({
            $:'jquery'
        }),
        // 加上注释
        new webpack.BannerPlugin('yldengww版权所有！'),
        // 插件抽离jquery,vue
        new webpack.optimize.CommonsChunkPlugin({
            name:['jquery','vue'],
            filename:'assets/js/[name].js',
            minChunks:2//抽离几个文件
        })
    ],
    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        progress: true
    },
    watchOptions:{
        poll:1000,//监测修改的时间(ms)
        aggregateTimeout :500, //防止重复按键，500毫米内算按键一次
        ignored:/node_modules/,//不监测
    }
}