//定义模块，   第一个数组里传入的是本模块所依赖的
define(["parabola","jquery","jquery-cookie"],function(parabola,$){
   
    cart_num();
    //*********封装头部导航相关事件函数
    // 导航内容加载
    function nav_download(){
        $.ajax({
            type:"get",
            url:"../json/nav.json",
            success:function(arr){
                // 只拿返回的数组中前三个数据就可以
                for(var i = 0;i < 3;i++){
                    $(`<div class="li_content clear">
                            <ul class="li_box clear">
                            </ul>
                        </div>`).appendTo($(".nav_box").find(".nav_item").eq(i));
                    for(var j = 0; j < arr[i].content.length; j++){
                        $(`<li class="item">
                            <a href="">
                                <img src="${arr[i].content[j].img}" alt="">
                            </a>
                            <span class="i_msg">${arr[i].content[j].msg}</span>
                        </li>`).appendTo($(".nav_box").find(".nav_item").eq(i).find(".li_box"));
                    }

                }
                navFunc();
                fixedFun();
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }

    //先定义鼠标移入移出事件
    function navFunc(){
        //给nav添加鼠标移入事件
        $(".nav_box").on("mouseenter",".nav_item",function(){
            //展示列表淡入页面
            $(this).find(".li_content").stop().fadeIn(600);
            //定义鼠标移入商品时 文字效果
            $(this).find(".item").hover(function(){
                $(this).find(".i_msg").css({"text-decoration":"underline","color":"#000"})
            },function(){
                $(this).find(".i_msg").css({"text-decoration":"none","color":"#000"})
            })
            //遮幕效果呈现
            if($(this).index() < 3){
                var h_mask = $(document.body).height();
                $(".mask").css({"display":"block","height":h_mask});
            }
            if($(this).index()>=3){
                    $(".mask").css("display","none");
            }
        })


        //给nav添加鼠标移出事件
        $(".nav_box").on("mouseleave",".nav_item",function(){
            $(".li_content").stop().fadeOut(600);
        })
        //删除遮幕效果
        $(".nav_box").on("mouseleave",function(){
            $(".mask").css("display","none");
        })  

    } 

    //定义页面滚动时，导航栏fixed定位   
    function fixedFun(){
        $(document).scroll(function(){
            var h = $(document).scrollTop();
            var w = $(window).width()
            if(h < 190){
               
                 $(".head_top").css({
                     "height":80,
                     "line-height":80,
                 })
                 $(".head_top_content li").css({
                    "margin-top":0
                 });
                 $(".logo").css("height",80);
                 $(".nav_box").css("height",50);
                 $(".nav_item").css({
                     "height":50,
                     "background":"url('../images/jt_03.png') no-repeat center 35px"
                    });
                 $(".ni_a").css({
                    "height":50,
                    "font-size":18,
                });
                $(".nav_item").eq(3).css({
                    "margin-top":0,
                })
                $(".nav_item").eq(4).css({
                    "margin-top":0,
            
                })
            }else{
                $(".head").css({
                    "height":80,
                    "width":w,
                 });
                 $(".head_top").css({
                     "height":50,
                     "line-height":50,
                     "overflow":"hidden"
                 })
                 $(".head_top_content li").css({
                    "margin-top":-15
                 });
                 $(".logo").css("height",50);
                 $(".nav_box").css({
                     "height":30,
                 });
                 $(".nav_item").css({
                     "height":30,
                     "background":"url('../images/jt_03.png') no-repeat 90px center"
                    });
                 $(".ni_a").css({
                    "height":30,
                    "font-size":14,
                });
                $(".nav_item").eq(0).css({
                    "background":"url('../images/jt_03.png') no-repeat 80px center",
                })
                $(".nav_item").eq(3).css({
                    "background":"url('../images/jt_03.png') no-repeat 100px center",
            

                })
                $(".nav_item").eq(4).css({
                
                    "background":"url('../images/jt_03.png') no-repeat 92px center",
                })
            }
    
        })
       
    }



    
    //**********侧边栏事件 
    function sideNav(){
        $.ajax({
            type:"get",
            url:"../json/side_nav.json",
            success:function(arr){
                for(var i = 0; i < arr.length;i++){
                    if(i <= 1){
                        $(`<dl>
                            <dt>
                                ${arr[i].name}
                                <span class="iconfont">&#xe62d;</span>
                            </dt>
                            <dd class="side_bar">
                            </dd>
                         </dl>`).appendTo($(".filter_content"))

                           //给前两个侧边栏导航设置移入移出事件
                        $("dl").eq(i).hover(function(){
                            $(this).find("dd").css("display","block");
                        },function(){
                            $(this).find("dd").css("display","none");
                        })
                      //循环创建系列和季节分类里面的三个行
                        for(var j = 0;j < arr[i].content.length;j++){

                            $(` <div class="sb_row">
                               <h3>${arr[i].content[j].class}</h3>
                              </div>`).appendTo($("dl").eq(i).find("dd"));
                              //事件委托，给子元素添加获取焦点和失去焦点事件
                            $(".sb_row").on("mouseenter",".fc_item",function(){
                                $(this).find("p").css("text-decoration","underline")
                            })
                            $(".sb_row").on("mouseout",".fc_item",function(){
                                $(this).find("p").css("text-decoration","none")
                            })
                            //给每个行里添加内容
                              for(var k = 0; k < arr[i].content[j].content.length;k++){
                                $(` <div class="fc_item">
                                        <img src="${arr[i].content[j].content[k].img}" alt="">
                                        <p>${arr[i].content[j].content[k].msg}</p>
                                    </div>`).appendTo($("dl").eq(i).find(".sb_row").eq(j))
                            }
                        }
                    }else if( i == 2){//创建第三个尺码分类
                        $(`<dl>
                        <dt>
                            ${arr[i].name}
                            <span class="iconfont plus">&#xe644;</span>
                        </dt>
                        <dd class="filter_size">
                        </dd>
                    </dl>`).appendTo($(".filter_content"));
                        $("dl").eq(i).find("dt").click(function(){
                            $(".filter_size").stop().slideToggle("slow");
                            if($(this).find("span").hasClass("plus")){
                                $(this).find("span").html("&#xeaf5;")
                                $(this).find("span").attr("class","iconfont reduce")
                            }else{
                                $(this).find("span").html("&#xe644;")
                                $(this).find("span").attr("class","iconfont plus")
                            }
                        })
                      
                        
                      
                        //循环添加span
                        var shose_size = parseFloat(35)
                        for(var l = 0;l < 20;l++){
                            $(`<span>${shose_size}</span>`).appendTo($(".filter_size"));
                            shose_size += 0.5;
                        }
                        //给每行最后一个span的margin-left设置为0，防止被挤下去
                        var span_num = $(".filter_size").find("span")
                        for(var m = 0;m<span_num.length;m++){
                            if((m+1)%4 == 0){
                                $(".filter_size").find("span").eq(m).css("margin-right",0);
                            }
                        }
                        $(".filter_size").find("span").hover(function(){

                            $(this).css({"border":"3px solid #000","padding":3});
                        },function(){
                            $(this).css({"border":"1px solid","padding":5});
                        })



                    }else{
                        $(` <dl>
                        <dt>
                            ${arr[i].name}
                            <span class="iconfont plus">&#xe644;</span>
                        </dt>
                        <dd class="drop_down">
                            <div class="dd_row"><span class="dd_select"></span>0-299</div>
                            <div class="dd_row"><span class="dd_select"></span>300-399</div>
                            <div class="dd_row"><span class="dd_select"></span>400-499</div>
                            <div class="dd_row"><span class="dd_select"></span>500-599</div>
                            <div class="dd_row"><span class="dd_select"></span>600-699</div>
                            <div class="dd_row"><span class="dd_select"></span>700+</div>
                        </dd>
                    </dl>`).appendTo($(".filter_content"));
                    
                    //定义选择价格事件
                        $(".dd_row").on("click",function(){
                            $(this).find(".dd_select").css("backgroundColor","#464646")
                            $(this).siblings(".dd_row").find(".dd_select").css("backgroundColor","#fff")
                        })
                        //点击显示价格详情
                        $("dl").eq(i).find("dt").click(function(){
                            $(".drop_down").stop().slideToggle("fast");
                            if($(this).find("span").hasClass("plus")){
                                $(this).find("span").html("&#xeaf5;")
                                $(this).find("span").attr("class","iconfont reduce")
                            }else{
                                $(this).find("span").html("&#xe644;")
                                $(this).find("span").attr("class","iconfont plus")
                            }
                        })
                    
                    }

                  
                }
              

            },
            error:function(msg){
                console.log(msg);
            }
        })
    }


    
//封装页面全部商品相关事件函数
//页面新品内容商品加载
var arr= [];
function product(){
    $.ajax({
        type:"get",
        url:"../json/product_list.json",
        success:function(arr){
            for(var i = 0;i < 2;i++){
                
                $(` <aside class="item_box pic_active">
                <a href="../html/product_details.html">
                    <img src="${arr[i].item}" alt="">
                </a>
                <a href="../html/product_details.html">${arr[i].name}</a>
                <span>￥${arr[i].price}</span>
                <div class="add_to_cart" id="${i}">加入购物车</div>
                <div id="ball${i}" class="ball"></div> 
                </aside>`).appendTo($(".product_display_box"));
            }


         
            product_animate()
            add_to_cart();

        },
        error:function(msg){
            console.log(msg);
        }
    })
}


//页面商品添加到购物车并储存cookie
function add_to_cart(){

    $(".add_to_cart").click(function(){
        //这里的id 是通用的，json里单个商品的id，对应商品添加购物车按钮的id和储存在cookie字符串中的商品id都一一对应
        var id = $(this).attr("id");
        var click_num
        //判断是否第一次创建关于商品的cookie
        var first = $.cookie("goods") == null?true:false;
        if(first){
            //如果是第一次创建cookie，用jquery的cookie方法创建新的cookie,并把第一次要储存的商品信息也储存进去
            //创建的商品信息要放到数组中，以便后续再往goods数组中，添加新的商品信息
            //储存商品信息，注意要转成json格式，两种方法，一是``,二是JSON.stringify()
            $.cookie("goods",JSON.stringify([{"id":id,"num":1}]),{expires:7})
        }else{//已经创建了cookie，并存储过goods（商品信息）
           //先假设cookie中没有该商品信息
            var isExistence = false;
            //先用jquery cookie方法获取cookie中的goods，获取的是json格式的数组，是一个字符串
            var goodsStr = $.cookie("goods");
           //把json格式的goods解析成数组
            var goodsArr = JSON.parse(goodsStr);
        
            
            //这里的goodsArr是1，因为数据库里只有一件商品
    //循环一下goodArr, 判断该商品在cookie中是否第一次添加，是的话，在cookie中对应的商品数量信息为1，如果为多次添加改变该商品在cookie中的数量信息
            for(var i = 0; i < goodsArr.length;i++){
                //如果存在，跳出循环
                if(goodsArr[i].id == id){
                    isExistence = true;
                    goodsArr[i].num++;
                    // alert(goodsArr[i].num)
                    break;
                }
            }
        //上面循环结束后如果cookie中没有该商品信息
            if(!isExistence){
                goodsArr.push({"id":id,"num":1});
            }
      //最后不论哪种情况，都要储存到cookie中,且注意要把goodArr数组 转成json格式
            $.cookie("goods",JSON.stringify(goodsArr),{expires:7}) 
        }
        console.log(JSON.parse( $.cookie("goods")))

        cart_num()
        ballMove(id)
    })
   
}







    // 封装页面商品获得属性动画
    function product_animate(){
        $(".pic_active").hover(function(){
            $(this).css({"border":"1px solid #464646"})
        },function(){
            $(this).css({"border":"1px solid #fff"})
        })
    }


   //实现点击购物车，小球运动时间
   function ballMove(num){
    //node当前点击的购物车按钮
    $("#ball"+num).css({
        display: "block",
        left:100,
        top:140,

    })

    var X = $(".sc_num").offset().left-$("#"+num).offset().left;
    var Y = $(".sc_num").offset().top -$("#"+num).offset().top;
    // alert($(".item_pic_big").offset().left)

    // 创建抛物线对象
    var bool = new Parabola({
        el: "#ball"+num,
        offset: [X, Y],
        duration: 800,
        curvature: 0.0005,
        callback: function(){
            $("#ball").hide();
        }
    })

    bool.start();
    

}





    //购物车数量显示
    function cart_num(){
        var goodsStr = $.cookie("goods");
        // alert(JSON.parse(goodsStr)[0].num)
        if(goodsStr){
            var num = 0;
            var goodsArr=JSON.parse(goodsStr);
            for(var i = 0; i< goodsArr.length;i++){
                num += goodsArr[i].num;
            }
            $(".sc_num").html(num)
        }else{
            $(".sc_num").html(0)
        }
    }
    
    


 
    
    //返回模块中的方法接口
    return {
        // banner_operation:banner_operation,
        nav_download:nav_download,
        sideNav:sideNav,
        product:product,
    }
})