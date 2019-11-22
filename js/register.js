//定义模块，   第一个数组里传入的是本模块所依赖的
define(["parabola","jquery","jquery-cookie","vf"],function(parabola,$,vf){
    cart_num()

    //封装头部导航相关事件函数  
    // 导航内容加载，用jquery的ajax方法请求虚拟服务器里的json数据，所以dist里的文件要放在服务器里才能运行
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





//简单表单验证
    function formValidation(){
           // 验证用户名
        var userName = $("#u_name");
        var userSpan = $("#u_span");
        $("#u_name").blur( function(){
            if($("#u_name").val().length < 6 || $("#u_name").val().length > 18){
                $("#u_span").html("❗️长度应为6~18个字符");  
                $("#u_span").css("color","red");     
                    
            }else if(!isABC($("#u_name").val())){
                $("#u_span").html("❗️用户名必需以英文字母开头") 
                $("#u_span").css("color","red");   
            }else{
                for(var i = 0; i < $("#u_name").val().length;i++){
                    if(!isStandard($("#u_name").val()[i])){
                        
                        $("#u_span").html("❗️用户名需由字母、数字或下划线组成") ;
                        $("#u_span").css("color","red");   
                        break;
                    }
                }
                $("#u_span").css("color","#000");
                return $("#u_span").html("✅符合注册要求");
            }
        })
       //验证密码
        var psdName = document.getElementById("psd");
        var psdSpan = document.getElementById("psd_span");
        $("#psd").blur (function(){
            if($("#psd").val().length < 6 || $("#psd").val().length > 16){
                $("#psd_span").html("!长度不符合要求");
                $("#psd_span").css("color","red");   
            }else{
                $("#psd_span").html("&nbsp;&nbsp;&nbsp;✅");
                $("#psd_span").css("color","#000"); 
            }
        })


        // 再次确认密码
        var confirmPsd = document.getElementById("psd_confirm");
        var confirmPsd_span = document.getElementById("confirm_span");
        $("#psd_confirm").blur(function(){
            if($("#psd_confirm").val().length < 1){
                $("#confirm_span").html( "！确认密码不能为空");
                $("#confirm_span").css("color","red");   
            }else if($("#psd_confirm").val() != $("#psd").val()){
                $("#confirm_span").html( "！密码不一致");
                $("#confirm_span").css("color","red");   
            }else{
                $("#confirm_span").html( "&nbsp;&nbsp;&nbsp;✅");
                $("#confirm_span").css("color","#000"); 
            }
    
        })

        var str = testCode(4)
        draw(str);
        $("#cc").click(function(){
            str = testCode(4)
            draw(str);
        });

        $("#vef_content").blur (function(){
            if($("#vef_content").val()==""){
                $("#vef_span").html('！不能为空');
                $("#vef_span").css("color", "red");
            }else if($("#vef_content").val().toLowerCase() == str.toLowerCase()){
                $("#vef_span").html("✅验证码正确");
                $("#vef_span").css("color", "#000");
                $(".verification").find(".iconfont").css("color","green");
            }else{
                $("#vef_span").html('验证码错误');
                $("#vef_span").css("color", "red");
            }
        })


        
    }



    //封装一个判断单个字符是否字母的函数
    function isABC(str){
        if(str[0] >= 'A' && str[0] <= 'Z' || str[0] >= 'a' && str[0] <= 'z' ){
            return true;
        }else{
            return false;
        }
    }
        //判断单个字符是否符合数字、字母下划线的函数
    function isStandard(charStr){
        if(charStr >= 'A' && charStr <= 'Z' || charStr >= 'a' && charStr <= 'z' || charStr >= 0 && charStr <= 9 || charStr == "_"){
            return true;
        }else{
            return false;
        }
    }



    //表单注册 向服务器传数据，服务器连接mysql数据库

    function regFun(){
        
        $("#right_now").click(function(){
            $.ajax({
                type:"post",
                url:"../php/register.php",
                data:{
                    userName:$("#u_name").val(),
                    passWord:$("#psd").val(),
                    cpassWord:$("#psd_confirm").val(),
                    createTime:(new Date()).getTime(),
                },
                success:function(result){
                    var res = JSON.parse(result);
                    switch(res.code){
                        case 0 :
                            $("#u_span").html(res.message);
                            $("#final_tip").html("注册成功")
                            $("#final_tip").css("display","block");
                            setTimeout(function(){
                                location.assign("login.html")
                            },500);
                            break;
                        case 1:
                            $("#final_tip").html(res.message);
                            $("#final_tip").css("color","red");
                            $("#final_tip").css("display","block");
                            break;
                        case 2 :
                            $("#final_tip").html(res.message);
                            $("#final_tip").css("color","red");
                            $("#final_tip").css("display","block");
                            break;
                        case 3:
                            $("#final_tip").html(res.message);
                            $("#final_tip").css("color","red");
                            $("#final_tip").css("display","block");
                            break;
                        case 4:
                            $("#final_tip").html(res.message);
                            $("#final_tip").css("color","red");
                            $("#final_tip").css("display","block");
                            break;
                        case 5 :
                            $("#final_tip").html(res.message);
                            $("#final_tip").css("color","red");
                            $("#final_tip").css("display","block");
                            break;
                        case 6:
                            $("#final_tip").html(res.message);
                            $("#final_tip").css("color","red");
                            $("#final_tip").css("display","block");
                            break;
                        default:
                            break;
                            
                    }
               
                       
                   
                },
                error:function(msg){
                    console.log(msg);
                }
            })
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
        
        nav_download:nav_download,
        formValidation:formValidation,
        regFun:regFun,
    }
})