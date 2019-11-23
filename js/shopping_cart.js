//定义模块，   第一个数组里传入的是本模块所依赖的
// alert(1)
define(["parabola","jquery","jquery-cookie"],function(parabola,$){
    cart_num()

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


    



     //*****从cookie中获取数据加载到页面 
    //定义一个全局数组用来装从cookie中匹配到的json中的数据
    var newArr=[];
    function scDownload(){
        $.ajax({
            type:"get",
            url:"../json/product_list.json",
            success:function(arr){
                var all_price = 0;
                var sum_item = 0;
                var goodsStr = $.cookie('goods');
                if(goodsStr){
                    var goodsArr = JSON.parse(goodsStr);
                    
                    //比较cookie和json中的数据；找出json中所有和cookie
                    //相同的数据，拿出来放进一个新数组
                    for(var i = 0;i<goodsArr.length;i++){
                        for(var j = 0; j< arr.length;j++){
                            if(goodsArr[i].id == arr[j].id){
                                arr[j].num = goodsArr[i].num;
                                newArr.push(arr[i]);
                            }
                        }
                    }
                    // alert(newArr.length)
                    for(var k = 0;k < newArr.length;k++){
                    
                        $(` <div class="scm_row" id="${newArr[k].id}">
                        <div class="info_change">
                            <div class="good_select iconfont">&#xe604;</div>
                            <div class="good_delete"><span class="iconfont">&#xe645;</span>删除</div>
                            <div class="good_edit"><span class="iconfont">&#xe640;</span>编辑</div>
                        </div>
                        <div class="goods_box">
                            <div class="goods_pic"><img src="${newArr[k].item}" alt=""></div>
                            <div class="goods_detail">
                                <h3 class="gd_name">${newArr[k].name}</h3>
                                <div>型号：<span class="gd_identifier">${newArr[k].identifier}</span></div>
                                <div>颜色：<span class="gd_color">${newArr[k].color}</span></div>
                                <div>尺码：<span class="gd_size">${newArr[k].size}</span></div>
                            </div>
                            <div class="goods_define">
                                <div class="gd_price"></div>
                                <div class="gd_num">
                                    数量：
                                    <span class="plus sc_btn ">+</span>
                                    <input type="text" value="${newArr[k].num}">
                                    <span class="reduce sc_btn">-</span>
                                </div>
                                <div class="gd_tips"></div>
                            </div>
                        </div>
                    </div>
                    `).appendTo(".sc_main")
                       var item_all_price = newArr[k].price*newArr[k].num;

                        $(".scm_row").eq(k).find(".gd_price").html("￥"+item_all_price);
                        //实际不会只有这一行商品，循环计算全部商品总价
                        
                        all_price+=item_all_price;
                        sum_item+=Number(newArr[k].num);
                        // alert(sum_item)
                       
                    }
                }else{
                    $(".sc_main").find(".good_box").remove()
                }
                
                $(".sumNumber").html($(".scm_row").length);
                $(".original_price").html("￥"+all_price);
                var dis_all_price = parseInt (all_price * 0.8);
                $(".discount_price").html("￥"+dis_all_price);
                $(".final_price").html("￥"+all_price);
                scDelete();
                scClick();
                change();


            },
            error:function(msg){
                console.log(msg)
            }

        })
    }
    
    //封装购物车删除物品
    function scDelete(){
        $(".good_delete").click(function(){
            var id = $(this).parents(".scm_row").remove().attr("id");
            var goodsStr=$.cookie("goods");
            var goodsArr=JSON.parse(goodsStr);
            for(var i = 0;i < goodsArr.length;i++){
                if(goodsArr[i].id==id){
                    goodsArr.splice(i,1)//数组中删除这个商品信息对象
                    break;
                }
            }
            if(!goodsArr.length){
                $.cookie("goods", null);
            }else{
                $.cookie("goods", JSON.stringify(goodsArr), {
                    expires: 7,

                })
            }
            cart_num();
            change();
           
        })
    }

    //页面中加号和减号添加事件
    function scClick(){
        //给+和-添加事件
        var goodsArr = JSON.parse($.cookie("goods"));
        $(".sc_btn").click(function(){
            //找到当前商品这一行
            var id = $(this).parents(".scm_row").attr("id");
            //1、找出这个数据,修改数量并在此放入到cookie
            for(var i = 0; i < goodsArr.length; i++){
                if(goodsArr[i].id == id){
                    if($(this).html() == "+"){
                        goodsArr[i].num++;
                        break;
                    }else if(goodsArr[i].num == 1 && $(this).html() == "-"){
                        alert("数量为1，不能在减少");
                    }else{
                        goodsArr[i].num--;
                        break;
                    }
                }
            }
            $(this).siblings("input").attr("value",`${goodsArr[i].num}`);
            $.cookie("goods", JSON.stringify(goodsArr), {
                expires: 7,
            })
            cart_num();
            change();
        })

    }

    //计算页面输入框数据变化
    function scChange(){
        $(".gd_num").find("input").change(function(){
            var num = Number($(this).val());
            
            var id = $(this).parents(".scm_row").attr("id");
            var goodsArr = JSON.parse($.cookie("goods"));
            for(var i = 0; i < goodsArr.length; i++){
                if(goodsArr[i].id == id){
                    goodsArr[i].num = num;
                    break
                }
            }
          
            $.cookie("goods", JSON.stringify(goodsArr), {
                expires: 7,
            })
            cart_num();
        })
    
    }


    //页面其它数据变化
    function change(){
        var sum_num = 0;
        var sum_price = 0;
        var discount_sum_price =0;
        for(var i = 0;i < $(".scm_row").length;i++){
            var num = $(".scm_row").eq(i).find("input").val();
            sum_num += num;
            $(".scm_row").eq(i).find(".gd_price").html("￥"+`${newArr[i].price}`)
            sum_price += newArr[i].price *num;
            $(".scm_row").eq(i).find(".gd_price").html("￥"+ num*newArr[i].price)
        }

        discount_sum_price = parseInt (sum_price * 0.8);
        $(".original_price").html("￥"+sum_price);
        $(".discount_price").html("￥"+discount_sum_price);
        $(".final_price").html("￥"+sum_price);
       
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


    
     
         
    //返回模块中的方法接口
    return {
        // banner_operation:banner_operation,
        nav_download:nav_download,
        scDownload:scDownload,
    }
})
