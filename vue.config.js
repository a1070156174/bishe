/*
 * @Author: your name
 * @Date: 2020-02-21 21:16:13
 * @LastEditTime: 2020-04-15 14:28:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\vue.config.js
 */
const path = require('path') 
function resolve (dir) { 
  return path.join(__dirname, dir) 
} 
module.exports = { 
  chainWebpack: config => { 
     // 添加新的svg-sprite-loader处理svgIcon
      config.module 
      .rule('svgIcon') 
      .test(/\.svg$/) 
      .include 
      .add(resolve('src/icons')) 
      .end() 
      .use('svg-sprite-loader')  // 一定要添加use 
      .loader('svg-sprite-loader') 
      .tap(options => { 
        options = { 
          symbolId: 'icon-[name]' 
        }  
        return options 
      }) 
      
      // 原有的svg图像处理loader添加exclude 
      config.module 
        .rule('svg') 
        .exclude 
        .add(resolve('src/icons')) 
        .end() 
  } ,
  

  devServer: { // 设置代理
    hot: true, // 热加载
    // host: '127.0.0.1', // ip地址
    port: 8088, // 端口
    https: false, // false关闭https，true为开启
    open: true, // 自动打开浏览器
    proxy: {
        '/api': { // 本地
            target: 'http://127.0.0.1:3000/',
            // 如果要代理 websockets
            ws: true,
            changeOrigin: true,
            pathRewrite:{
                "^/api": ""
            }
        },
    },
},

}