import service from '../utils/request';


/**
 * 定义一个方法
 * 
 * 登录接口
 */
export function Login(data){


    return service.request({
        url:"/login/",
        method:"post",
        data:data, //请求类型为post时
        //ES6中可以直接写  data  (传入的值和变量定义的值一样 只写一个)
        // params:data  //请求类型为get
    })
}

/**
 * 获取验证码
 */
export function GetCode(data){
    return service.request({
        url:'/getSms/',
        method:"post",
        data
    })

}