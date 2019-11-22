//配置引入的文件路径

require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
    
        "login":"login"// 商品列表js模块
    },
    //注入非标准模块
    shim:{
         //设置依赖关系，规定先引入jquery，再引入jquery-cookie
         "jquery-cookie":["jquery"],
         //声明当前模块不遵从AMD规范，并取消暴露
        //   "parabola": {
        //       exports:"_"
        //   }
    }
})

//调用模块
require(["login"],function(log){
    log.nav_download();
    log.loginFun();
})