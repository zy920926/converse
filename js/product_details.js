//定义模块，   第一个数组里传入的是本模块所依赖的其它模块
// alert(1)
define(["jquery","jquery-cookie","parabola"],function($){
   
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

    

    //*****商品详情
    function item_download(){
        $.ajax({
            type:"get",
            url:"../json/product_list.json",
            success:function(arr){
               $(` <div class="ib_head">
               <h1 class="item_name">${arr[0].name}</h1>
               <div class="item_price">价格：￥${arr[0].price}</div>
           </div>
           <div class="item_pic">
               <div class="item_pic_big"><div id ="mark"></div><div id ="ball"></div></div>
               <div class="item_pic_list"></div>
           </div>
           <div class="item_introduce">
               <ul></ul>
               <h3>价格说明（此说明仅当出现价格比较时有效）</h3>
               <p>划线价格：划线的价格可能是商品的专柜吊牌价或正品零售价指导价或该商品的曾经展示过的销售价等，仅供您参考。</p>
               <p>未划线价格：未划线的价格是商品在官网上的销售标价，具体的成交价格可能因为会员使用优惠券发生变化，最终以订单结算页价格为准。</p>
               <div class="return_btn">${arr[0].class}</div>
           </div>
          `).appendTo($(".item_box"));
          //把大小图片加载到页面
                for(var i = 0;i<arr[0].img.bimg.length;i++){
                    //添加大图片到页面
                    $(`<div class="ipb_box"><img src="${arr[0].img.bimg[i]}" alt=""></div>`).appendTo($(".item_pic_big"));
                    //放大镜里也按顺序添加大图片
                    $(`<img src="${arr[0].img.bimg[i]}" alt="">`).appendTo($("#big_box"))
                    //添加小图片到图片列表
                    $(`<a href="javascript:void(0)"><img src="${arr[0].img.simg[i]}" alt=""></a>`).appendTo($(".item_pic_list"));
                    
                }
                //让第一张大图片和放大镜里的图片显示,ball里加入一张小图片
                $(".item_pic_big").find(".ipb_box").eq(0).css("display","block");
                $("#big_box").find("img").eq(0).css("display","block")
                $(`<img src="${arr[0].img.simg[0]}" alt="">`).appendTo($("#ball"));
            //添加商品介绍
                for(var j = 0; j<arr[0].introduce.length;j++){
                    $(` <li>${arr[0].introduce[j]}</li>`)
                    .appendTo($(".item_introduce").find("ul"));
                }

            //给添加到购物车按钮添加json中图片的id
            $(".add_to_cart").attr("id",`${arr[0].id}`)
            

                pic_tab();
                magnifier();
                
            },
            error:function(msg){
                console.log(msg);
            }
        })
     }
    // 添加图片切换事件
    function pic_tab(){
        $(".item_pic_list").find("a").on("click",function(){
            $(this).attr("class","ha").siblings().attr("class",null);
            var index = $(this).index();
            //找到大图中对应的图片，并显示
            $(".item_pic_big").find(".ipb_box").eq(index).fadeIn().siblings(".ipb_box").fadeOut();
            //找到放大镜的放大框中对应的图片
            $("#big_box").find("img").eq(index).fadeIn().siblings().fadeOut();
        })
                 
    }

    //添加放大镜事件
    function magnifier(){
        //鼠标移入大图片盒子
        $(".item_pic_big").on("mouseenter",function(){
            $("#big_box").css("display","block");
            $("#mark").css("display","block");
            //放大镜跟随鼠标移动事件
            $(document).mousemove(function(){
                var e = arguments[0] || window.event;
                var l = e.clientX - $(".item_pic_big").offset().left - 50 ;
                var t = e.pageY - $(".item_pic_big").offset().top -85;//pageY目标在页面中的y的坐标
                if(l <= 0){
                    l = 0;
                }
                if(l >= 350){
                    l = 350;
                }
                if(t <= 0){
                    t = 0;
                }
                if(t >= 280){
                    t = 280;
                }
                $("#mark").css({"left":l,"top":t});
                $("#big_box").find("img").css({"left":l*-3,"top":t*-3})
              
            })
           
        })
        //鼠标移除大图片盒子
        $(".item_pic_big").on("mouseleave",function(){
            $("#big_box").css("display","none");
            $("#mark").css("display","none");
        })

       
    }
   
    //购物车
    function add(){
        $(".add_to_cart").click(function(){
            //这里的id 是通用的，json里单个商品的id，对应商品添加购物车按钮的id和储存在cookie字符串中的商品id都一一对应
            var id = $(this).attr("id");
            //判断是否第一次创建关于商品的cookie
    
            var first = $.cookie("goods") == null?true:false;
            if(first){
                //如果是第一次创建cookie，用jquery的cookie方法创建新的cookie,并把第一次要储存的商品信息也储存进去
                //创建的商品信息要放到数组中，以便后续再往goods数组中，添加新的商品信息
                //储存商品信息，注意要转成json格式，两种方法，一是``,而是JSON。stringify()
                $.cookie("goods",JSON.stringify([{"id":id,"num":1}]),{expires:7})
            }else{//已经创建了cookie，并存储过goods（商品信息）
               //先假设cookie中没有该商品信息
                var isExistence = false;
                //先用jquery cookie方法获取cookie中的goods，获取的是json格式的数组，是一个字符串
                var goodsStr = $.cookie("goods");
               //把json格式的goods解析成数组
                var goodsArr = JSON.parse(goodsStr);
                
                
        //循环一下goodArr, 判断该商品在cookie中是否第一次添加，是的话，在cookie中对应的商品数量信息为1，如果为多次添加改变该商品在cookie中的数量信息
                for(var i = 0; i < goodsArr.length;i++){
                    //如果存在，跳出循环
                    if(goodsArr[i].id = id){
                        isExistence = true;
                        goodsArr[i].num++;
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
            cart_num();
            ballMove();
        })
    }


    //实现导航里购物中图标旁边的数字 跟随商品数量变化而变化
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

    //实现点击购物车，小球运动时间
    function ballMove(){
        //node当前点击的购物车按钮
        $("#ball").css({
            left: 175,
            top: 175,
            display: "block"
        })

        var X = $(".sc_num").offset().left-300;
        var Y = $(".sc_num").offset().top -800;
        // alert($(".item_pic_big").offset().left)

        // 创建抛物线对象
        var bool = new Parabola({
            el: "#ball",
            offset: [X, Y],
            duration: 800,
            curvature: 0.0005,
            callback: function(){
                $("#ball").hide();
            }
        })

        bool.start();
        
    
    }
        
    
    
    
    
     
         
    //返回模块中的方法接口
    return {
        // banner_operation:banner_operation,
        nav_download:nav_download,
        item_download:item_download,
        add:add
    }
})
