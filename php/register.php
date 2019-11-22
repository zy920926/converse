<?php
//定义头部
    header("Content-type:text/html;charset=utf-8");
	
    // js中用ajax 的post方法提交过来的数据（ajax里的data）会储存在
    //$_POST[] 数组里
	// 取出post提交过来的数据
	
    $username = $_POST["userName"];
    $password = $_POST["passWord"];
    $cpassword = $_POST["cpassWord"];
    $createTime = $_POST["createTime"];
    
    
     // 设置一个统一的返回格式的数组
     $responseResult = array("code" => 0,"message" => "");

     //简单的验证
	if(!$username){
		$responseResult["code"] = 1;
		$responseResult["message"] = "用户名不能为空";
		echo json_encode($responseResult);
		exit;
	}
	if(!$password){
		$responseResult["code"] = 2;
		$responseResult["message"] = "密码不能为空";
		echo json_encode($responseResult);
		exit;
	}
	if($password != $cpassword){
		$responseResult["code"] = 3;
		$responseResult["message"] = "两次输入的密码不一致";
		echo json_encode($responseResult);
		exit;
    }

    //点击注册按钮时  链接数据库mysql 进行判断是否为之前注册过用户名
    //链接创建好的数据库
    $link = mysql_connect("localhost","root","123456"); 

    //如果数据库链接不成功，返回页面信息
	if(!$link){
		$responseResult["code"] = 4;
		$responseResult["message"] = "服务器忙";
		echo json_encode($responseResult);
		exit;
    }
    
    // 设置访问的语句 编码格式
	mysql_set_charset("utf8");

   //选择数据库
	mysql_select_db("converse");

	//准备sql语句  判断数据库是否有同名用户名
	$sql = "SELECT * FROM converse_user WHERE username='{$username}'";

    //发送上述命令进行查询并返回一个资源
    $res = mysql_query($sql); 
    
    //如果存在的话会从资源集中拿出这个username对应的关联数组
	$row = mysql_fetch_assoc($res); 
	if($row){
		$responseData["code"] = 5;
		$responseData["message"] = "用户名已注册";
		echo json_encode($responseData);
        // 退出数据库
        exit;
	}

	//密码要进行md5加密
	$str = md5(md5(md5($password)."converse")."qingdao");

	//如果判断是第一次注册，进行数据存入mysal的操作
	$sql = "INSERT INTO converse_user(username,password,create_time) VALUES('{$username}','{$password}','{$createTime}')";

    //发送上述命令进行查询并返回一个资源
	$res = mysql_query($sql);
	if(!$res){
		$responseResult["code"] = 6;
		$responseResult["message"] = "服务器忙";
        //对变量进行json编码
        echo json_encode($responseResult);
		exit;
	}else{
		$responseResult["message"] = "注册成功";
		echo json_encode($responseResult);
	}
	mysql_close($link);


?>