//定义模块，   第一个数组里传入的是本模块所依赖的
define(["parabola","jquery","jquery-cookie"],function(parabola,$){
    cart_num()

    //封装头部导航相关事件函数  
    // 导航内容加载，用jquery的ajax方法请求虚拟服务器里的json数据，所以dist里的文件要放在服务器里才能运行
    function nav_download(){
        $.ajax({
            type:"get",
            url:"json/nav.json",
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
                                <img src="${(arr[i].content[j].img).substring(3)}" alt="">
                                
                            </a>
                            <span class="i_msg">${arr[i].content[j].msg}</span>
                        </li>`).appendTo($(".nav_box").find(".nav_item").eq(i).find(".li_box"));
                    }
    
                }
                navFunc();
                hWheel();
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
        //在顶部商品导航的尾部添加遮幕，遮幕效果呈现
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
                     "background":"url('images/jt_03.png') no-repeat center 35px"
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
                     "overflow":"hidden",
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
                     "background":"url('images/jt_03.png') no-repeat 90px center"
                    });
                 $(".ni_a").css({
                    "height":30,
                    "font-size":14,
                });
                $(".nav_item").eq(0).css({
                    "background":"url('images/jt_03.png') no-repeat 80px center",
                })
                $(".nav_item").eq(3).css({
                    "background":"url('images/jt_03.png') no-repeat 100px center",
        
                })
                $(".nav_item").eq(4).css({

                    "background":"url('images/jt_03.png') no-repeat 92px center",
                })
            }
    
        })
       
    }






//定义头部的底层内容自动切换
    function hWheel(){
        var oArticle = $(".h_content").find("article");
        var aP = oArticle.find("p");
        var iNow = 0;
        //给内容部分结尾再添加一次第一条内容，用来衔接
        $(`<p>${aP.eq(0).html()}</p>`).appendTo($(".h_content").find("article"));
        timer = setInterval(function(){
            iNow++;
            wp_content();
        }, 4000);

        function wp_content(){ //wheel planting
            oArticle.animate({left:-1000*iNow},1500,function(){
                if(iNow == 3){
                    iNow = 0;
                    oArticle.css("left",0);
                }
            })
        }
        
    }



//banner图操作函数
    function banner_operation(){
        $.ajax({
            type:"get",
            url:"json/banner.json",
            success: function(arr){//拿到data.json里的数据是数组
            //创建轮播图整体结构
                $(` 
                <div class="img_box"></div>
                <div class="left_btn"></div>
                <div class="right_btn"></div>
                <ul class="b_nav">
                    <li>真的有故事</li>
                    <li>GOLF le FLEUR*</li>
                    <li>PONY HAIR</li>
                    <li>Forest Dimension</li>
                </ul>
                `).appendTo($(".banner"))
            //拿到图片数据，循环遍历渲染到页面中，此时页面中的图片都是绝对定位，重叠在一起，最后一张加入结构中的图片层级最高，显示在最上面
                for(var i = 0; i < arr.length;i++){
                    $(`<img src="${arr[i].img}" alt="">`).prependTo($(".img_box"))
                }
            //初始化banner导航样式
                $(".b_nav li").eq(0).css({"text-decoration":"overline","color":"#000"}).attr("id","li_active");
                
            //定义图片及图片导航移动事件函数
                function play(num){
                    $(".b_nav li").eq(num).css({"text-decoration":"overline","color":"#000"}).attr("id","li_active").siblings().css({"text-decoration":"none","color":"#999"}).attr("id",null);
                    $(".img_box img").eq(3-num).stop().fadeIn(1000).siblings().stop().fadeOut(1000);

                }  
        
            //给banner导航添加移入事件，并设置鼠标移入某一个子导航时会显示对应的图片，且同时清除定时器
            //移出开启定时器
                $(".b_nav li").hover(function(){
                    var index = $(this).index();
                    play(index);   
                    clearInterval(timer)
                    },function(){
                        var index = $(this).index();
                        timer = setInterval(function(){
                            index++
                            play(index);
                            if(index == 3){
                                index = -1;
                            } 
                        },3000)
                })
            

            //给图片添加移入停止定时器，移出开启定时器
                $(".img_box img").hover(function(){
                    clearInterval(timer)
                },function(){
                    var index = 3 - $(this).index();
                    timer = setInterval(function(){
                        index++
                        play(index);
                        if(index == 3){
                            index = -1;
                        } 
                    },3000)
                })

            //设置一个定时器，让图片自动轮播
                var i = 0;
                var timer = setInterval(function(){
                    i++
                    play(i);
                    if(i == 3){
                        i = -1;
                    }
                },3000)
                
                //左右点击
                var ali = $(".b_nav").find("li");
                //左点击
                $(".left_btn").click(function(){
                    clearInterval(timer);
                    for(var i =0;i < ali.length;i++){
                        if(ali.eq(i).attr("id") == "li_active"){
                            index = i
                            i--;
                            if(i == -1){
                                i = 3;
                            }
                            play(i);
                            break
                        
                        }
                    }
                });
                //右点击
                $(".right_btn").click(function(){
                    clearInterval(timer);

                    for(var i =0;i < ali.length;i++){
                        if(ali.eq(i).attr("id") == "li_active"){
                            i++;
                            if(i == 4){
                                i = 0;
                            }
                            play(i);
                            break;
                        }
                    }
                  
                })
                // $(".img_box img").on("mouseleave",function(){
                //     clearInterval(timer);
                 
                // })
                

       
    
                
                
            },
            error:function(msg){
                console.log(msg);
               
            }
        })
    }
   



//封装 热门商品相关事件函数
    function popular(){
    //渲染页面中热门商品导航部分
        $.ajax({
            type:"get",
            url:"json/product.json",
            success:function(arr){
                var node =$(`  <div class="p_title">
                <h1>热卖单品</h1>
            </div>
            <div class="p_nav"></div>
            <div class="p_line">
                    <div class="iconfont">&#xe6aa;</div>
            </div>`)
                node.appendTo($(".popular")) ;

                //循环添加nav导航节点  
                for(var i = 0; i < arr.length; i++){
                    $(`<aside>
                        <a href="" class="p_class">${arr[i].title}</a>
                        <a href=""><img src="${(arr[i].img).substring(3)}" alt=""></a>
                    </aside>`).appendTo($(".p_nav"))
                }
                //添加每个子导航对应的下拉列表
                for(var i = 0; i<arr.length;i++){
                    $(`  <div class = "p_content .clear">
                    <div class="row_content"></div>     
                    <div class="split"></div>
                    <div class="row_content"></div>
                     <a href="${(arr[0].href).substring(3)}" class="view_all_btn active">
                         ${arr[i].select}
                         <span class="iconfont">&#xe62d;</span>
                    </a>
                </div>`).appendTo($(".popular"))
                }
               
                //在每个子导航中插入内容
                for(var i = 0; i < arr.length;i++){
                    for(var j = 0; j < arr[i].content.length;j++){
                       
                        var item = $(` <aside class="p_box pic_active">
                        <a href="">
                            <img src="${(arr[i].content[j].img).substring(3)}" alt="">
                        </a>
                        <a href="">${arr[i].content[j].msg}</a>
                        <span>${arr[i].content[j].price}</span>
                    </aside>`);
                    if(j<4){
                        // var target_node = $()
                        item.appendTo($(".p_content").eq(i).find(".row_content").eq(0));
                    }else{
                        item.appendTo($(".p_content").eq(i).find(".row_content").eq(1));

                    }

                    }
                }
                
                //切换热门商品对应的展示框
                $(".p_content").eq(0).css("display","block")
                $(".p_nav").on("mouseenter","aside",function(){
                    var index = $(this).index();
                    // alert(index)
                    $(".p_content").eq(index).fadeIn(500).siblings(".p_content").fadeOut(500)

                })


             //滑动块 移动事件
                $(".p_nav aside").on("mouseenter",function(){
                    $(this).find("a:nth-child(1)").css("text-decoration","underline");
                    var l = $(this).index()*250+100;
                    $(".p_line .iconfont").css("display","block").animate({left:l},200,"linear")
                })
                //移除时商品标题失去下划线,并且滑块消失
                $(".p_nav aside").on("mouseleave",function(){
                    // $(".p_line .iconfont").css("display","none")
                    $(this).find("a:nth-child(1)").css("text-decoration","none");
                })

                product_animate()
            },
            error:function(msg){
                console.log(msg)
            }
        })

    }

    


//页面新品内容商品加载
    function new_product(){
        $.ajax({
            type:"get",
            url:"json/new.json",
            success:function(arr){
              $(` <div class="n_title">
                    <h1>新品推荐</h1>
                  </div>
                <div class="row_content"> </div>
                <div class="split"></div>
                <div class="row_content"></div>  
                <div class="split"></div>
                <div class="row_content"></div>
                <div class="split"></div>
                <div class="row_content"></div>`).appendTo($(".new"))
                for(var i =0; i < 16;i++){
                    if(i < 4){
                        $(` <aside class="n_box pic_active">
                        <a href="">
                            <img src="${(arr[0].img).substring(3)}" alt="">
                        </a>
                        <a href="">${arr[0].msg}</a>
                        <span>${arr[0].price}</span>
                    </aside>`).appendTo($(".new .row_content").eq(0))
                    }else if(i<8){
                        $(` <aside class="n_box pic_active">
                        <a href="">
                            <img src="${(arr[0].img).substring(3)}" alt="">
                        </a>
                        <a href="">${arr[0].msg}</a>
                        <span>${arr[0].price}</span>
                    </aside>`).appendTo($(".new .row_content").eq(1))
                    }else if(i < 12){
                        $(` <aside class="n_box pic_active">
                        <a href="">
                            <img src="${(arr[0].img).substring(3)}" alt="">
                        </a>
                        <a href="">${arr[0].msg}</a>
                        <span>${arr[0].price}</span>
                    </aside>`).appendTo($(".new .row_content").eq(2))
                    }else{
                        $(` <aside class="n_box pic_active">
                        <a href="">
                            <img src="${(arr[0].img).substring(3)}" alt="">
                        </a>
                        <a href="">${arr[0].msg}</a>
                        <span>${arr[0].price}</span>
                    </aside>`).appendTo($(".new .row_content").eq(3))
                    }
                }

                product_animate()

            },
            error:function(msg){
                console.log(msg);
            }
        })
    }


// 封装页面商品获得属性动画
    function product_animate(){
        $(".pic_active").hover(function(){

            $(this).css({"border":"1px solid #000",
        "margin-top":"1px"})
        },function(){
            $(this).css({"border":"1px solid #fff",
            "margin-top":"0"})
        })
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
        banner_operation:banner_operation,
        popular:popular,
        nav_download:nav_download,
        new_product:new_product,
    }
})