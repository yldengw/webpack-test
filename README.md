# webpack-test
# webpack实践记录和总结

订阅请 watch， 收藏点赞请 star， fork 好像没必要
## [Webpack]
1. 配置文件热加载

2. css文件处理、图片打包、路径处理、html的图片路径等

3. less、sass文件分离和处理
 ## use: extractTextPlugin.extract({
 ##  use:[{ loader:'css-loader'},{loader:'sass-loader'}],
   ## fallback:'style-loader'
##  })

把style-loader传给了fallback，这个配置的基本含义就是，extract默认行为先使用css-loader编译css，如果一切顺利的话，结束之后把css导出到规定的文件去。但是如果编译过程中出现了错误，则继续使用style-loader处理css,交给浏览器

4. 打包调试
如果大型项目可以使用source-map，如果是中小型项目使用eval-source-map，source map只适用于开发阶段，上线前记得修改试设置.开启配置inline-soure-map 可以快速定位文件报错位置



