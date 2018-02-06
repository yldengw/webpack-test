const path = require('path');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
const glob = require("glob");
const pruifyCssPlugin = require("purifycss-webpack");
// var website = {
//     publicPath: 'http://127.0.0.1:8080'
// }
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
        publicPath:''
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
            }
        ]
    },
    plugins: [
        // new UglifyJSPlugin(),
        new htmlPlugin({
            template:'./index.html'
        }),
        new extractTextPlugin('index.css'),
        // 打包删掉冗余的css
        new pruifyCssPlugin({
            paths:glob.sync(path.join(__dirname,'*.html'))
        })

    ],
    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        progress: true
    }
}