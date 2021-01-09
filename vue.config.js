module.exports = {
    //配置信息开发环境的信息
    devServer: {
        //host: "localhost",
        //port: "8080",
        // https: false, // https:{type:Boolean}
        // open: true, //配置自动启动浏览器,
        //跨域配置信息
        // /admin/login 
        proxy: {
            '/admin': { //代理api
                target: 'http://ceshi5.dishait.cn/admin',//服务器api地址
                ws: true,// proxy websockets
                changeOrigin: true,//是否跨域
                pathRewrite: { //重写路径
                    '^/admin': ''
                }
            }
        }
    }
}