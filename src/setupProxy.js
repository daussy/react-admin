//跨域文件

const proxy = require('http-proxy-middleware');

module.exports = function(app){
    app.use(proxy([process.env.REACT_APP_API],{
        target:process.env.REACT_APP_BASE_URL,  //配置你要请求的服务器地址
        changeOrigin:true,  //允许跨域请求
        pathRewrite:{
            [`^${process.env.REACT_APP_API}`]:"", //ES6写法，等价于下面那种方法
            // "^/devApi":"", //地址重写
        }
    }))

    //https://localhost:3000/devApi/login/    ip地址+端口+拦截器实例中的devApi+调用的接口地址

    //devApi/login/
    /**
     * 1.匹配到devApi 开始做代理，代理内容:target:"http://www.web-jshtml.cn/api/react",
     * 2.查找到  /devApi/login  就会进行路径重写， /devApi/login/ =>  /login/
     * 3.替换之后的地址：  https://www.web-jshtml.cn/api/react/login/
     */

    // app.use(proxy("/devApi/api",{
    //     target:"http://admintest.happymmall.com:7000",
    //     changeOrigin:true,
    // }))
};