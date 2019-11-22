
// 随机生成一个六位包含数字和字母的字符串
function testCode(n){
	var arr = [];
	for(var i = 0; i < n; i++){
		var tmp = parseInt(Math.random() * 123);
		if(tmp >= 0 && tmp <= 9){
			arr.push(tmp);
		}else if(tmp >= 65 && tmp <= 90 || tmp >= 97 && tmp <= 122){
			arr.push(String.fromCharCode(tmp));
		}else{
			//随机到别的不在范围内的数
			i--;
		}
	}
	return arr.join("");
}






//拿到一个6位字符串，在画布上画出来
function draw(testCode) {
  var canvas_width=document.getElementById('canvas').clientWidth;
  var canvas_height=document.getElementById('canvas').clientHeight;
  var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
  var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
  canvas.width = 22 * testCode.length;
  canvas.height = canvas_height;
  

  //有n位验证，可以绘制n位字符
  for (var i = 0; i < testCode.length; i++) {
     
      var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
      var txt = testCode[i];//得到随机的一个内容
      // show_num[i] = txt;
      var x = 10 + i * 20;//文字在canvas上的x坐标
      var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
      context.font = "bold 23px 微软雅黑";

      context.translate(x, y);
      context.rotate(deg);

      context.fillStyle = randomColor();
      context.fillText(txt, 0, 0);

      context.rotate(-deg);
      context.translate(-x, -y);
  }
  for (var i = 0; i <= 5; i++) { //验证码上显示线条
      context.strokeStyle = randomColor();
      context.beginPath();
      context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
      context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
      context.stroke();
  }
  for (var i = 0; i <= 30; i++) { //验证码上显示小点
      context.strokeStyle = randomColor();
      context.beginPath();
      var x = Math.random() * canvas_width;
      var y = Math.random() * canvas_height;
      context.moveTo(x, y);
      context.lineTo(x + 1, y + 1);
      context.stroke();
  }
}

//生成随机颜色
function randomColor(){
  var str = "rgba(" + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + ",1)";
  return str;
}