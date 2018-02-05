const path = require('path');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
var website = {
    publicPath: 'http://127.0.0.1:8080'
}
module.exports = {
    // 入口文件的配置项
    entry: {
        entry: './src/entry.js'
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
                        loader:'css-loader',
                        query:{
                            name: 'index.css'
                        }
                    }]
                  })
            },
            {
                test: /\.(png|jsp|gif)/,
                use: [{
                    loader:'file-loader',
                    options: {
                        limit: 500000,
                        outputPath: 'images/'
                    }
                    // query:{
                    //     name: 'assets/[hash].[ext]'
                    // }
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
            }
        ]
    },
    plugins: [
        // new UglifyJSPlugin(),
        new htmlPlugin({
            template:'./index.html'
        }),
        new extractTextPlugin('/css/index.css')
    ],
    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        progress: true
    }
}