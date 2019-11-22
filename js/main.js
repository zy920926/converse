//配置引入的文件路径
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "parabola":"parabola", //抛物线方程
        "index":"index"// 首页js模块
    },
    //注入非标准模块
    shim:{
         //设置依赖关系，规定先引入jquery，再引入jquery-cookie
         "jquery-cookie":["jquery"],
         //声明当前模块不遵从AMD规范，并取消暴露
          "parabola": {
              exports:"_"
          }
    }
})

//调用模块
require(["index"],function(index){
    index.banner_operation();
    index.popular();
    index.nav_download();
    index.new_product();
})