
//抽奖转盘
var turnWheel = {
    rewardNames: [], //转盘奖品名称数组
    rewardUrl: [], //转盘奖品图片
    prizeId:[],
    colors: [], //转盘奖品区块对应背景颜色
    outsideRadius: 340, //转盘外圆的半径
    textRadius: 320, //转盘奖品位置距离圆心的距离
    insideRadius: 68, //转盘内圆的半径
    startAngle: 0, //开始角度
    bRotate: false //false:停止;ture:旋转
};
turnWheel.rewardNames = ["谢谢参与", "吃大餐", "大保健", "看电影", "卡拉OK", "打球"];
//6个图片地址,需要自己写一下
turnWheel.rewardUrl = ['', '', '', '', '', ''];
turnWheel.prizeId = ["6", "1", "2", "3", "4", "5"];
turnWheel.colors = [
    "#AE3EFF",
    "#4D3FFF",
    "#FC262C",
    "#3A8BFF",
    "#EE7602",
    "#FE339F"
];
// 图片信息
var imgUrl1 = new Image();
imgUrl1.src = turnWheel.rewardUrl[0];
var imgUrl2 = new Image();
imgUrl2.src = turnWheel.rewardUrl[1];
var imgUrl3 = new Image();
imgUrl3.src = turnWheel.rewardUrl[2];
var imgUrl4 = new Image();
imgUrl4.src = turnWheel.rewardUrl[3];
var imgUrl5 = new Image();
imgUrl5.src = turnWheel.rewardUrl[4];
var imgUrl6 = new Image();
imgUrl6.src = turnWheel.rewardUrl[5];


/**
 *
 * @param item 中奖奖品序号，从0开始的
 * @param tip 提示语
 * @param count 奖品的总数量
 */
var rotateFunc = function (item, tip,count){

    // 应该旋转的角度，旋转插件角度参数是角度制。
    var baseAngle = 360 / count;
    // 旋转角度 == 270°（当前第一个角度和指针位置的偏移量） - 奖品的位置 * 每块所占的角度 - 每块所占的角度的一半(指针指向区域的中间)
    angles = 360 * 3 / 4 - ( item * baseAngle) - baseAngle / 2; // 因为第一个奖品是从0°开始的，即水平向右方向
    $('#wheelCanvas').stopRotate();
    // 注意，jqueryrotate 插件传递的角度不是弧度制。
    // 哪个标签调用方法，旋转哪个控件
    $('#wheelCanvas').rotate({
        angle:0,
        animateTo:angles + 360 * 30, // 这里多旋转了5圈，圈数越多，转的越快
        duration:30000,
        callback:function (){ // 回调方法
            document.getElementById('wheel-tip').innerHTML = (tip==='谢谢参与'? '谢谢参与' : '恭喜抽中：' + tip);
            turnWheel.bRotate = !turnWheel.bRotate;
        }
    });
};
// 抽取按钮按钮点击触发事件
$('.pointer').click(function (){
    // 正在转动，直接返回
    if(turnWheel.bRotate) return;

    turnWheel.bRotate = !turnWheel.bRotate;
    var count = turnWheel.rewardNames.length;

    //抽奖
    var item = 1;
    turnWheel.prizeId.forEach(function(currentValue, index){
        // 开始抽奖
        document.getElementById('wheel-tip').innerHTML = '冲、冲、冲鸭！';
        rotateFunc(item, turnWheel.rewardNames[item],count);
    })

});

function drawWheelCanvas() {
    var canvas = document.getElementById("wheelCanvas");
    var baseAngle = Math.PI * 2 / (turnWheel.rewardNames.length);
    var ctx = canvas.getContext("2d");
    var canvasW = canvas.width; // 画板的高度
    var canvasH = canvas.height; // 画板的宽度
    ctx.fillStyle = "#fff000";
    ctx.clearRect(0,0,canvasW,canvasH);//去掉背景默认的黑色
    console.log(canvasW);
    ctx.strokeStyle = "#199301"; //线的颜色
    ctx.font = '30px STHeiti-Light';
    //ctx.closePath();
    //使用了beginPath(),canvas会知道是重新画一条，如果给这几条设置不同的属性也是可以的。
    for(var index = 0; index < turnWheel.rewardNames.length; index++) {
        var angle = turnWheel.startAngle + index * baseAngle;
        ctx.fillStyle = turnWheel.colors[index];
        ctx.beginPath();
        ctx.arc(canvasW * 0.5, canvasH * 0.5, turnWheel.outsideRadius, angle, angle + baseAngle, false);
        ctx.arc(canvasW * 0.5, canvasH * 0.5, turnWheel.insideRadius, angle + baseAngle, angle, true);
        ctx.stroke();
        ctx.fill();
        ctx.save();
        ctx.fillStyle = "#FFFF00";
        var rewardName = turnWheel.rewardNames[index];

        var line_height = 24;
        var translateX = canvasW * 0.5 + Math.cos(angle + baseAngle / 2) * turnWheel.textRadius;
        var translateY = canvasH * 0.5 + Math.sin(angle + baseAngle / 2) * turnWheel.textRadius;
        ctx.translate(translateX, translateY);
        ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);
        //ctx.drawImage(imgUrl1, -15, 10);
        ctx.fillText(rewardName, -ctx.measureText(rewardName).width / 2, 100);
        //添加对应图标
        /*if (index == 0) {
            ctx.drawImage(imgUrl1, -35, 0, 60, 60);
        } else if (index == 1) {
            ctx.drawImage(imgUrl2, -35, 0, 60, 60);
        } else if (index == 2) {
            ctx.drawImage(imgUrl3, -35, 0, 60, 60);
        } else if (index == 3) {
            ctx.drawImage(imgUrl4, -35, 0, 60, 60);
        } else if (index == 4) {
            ctx.drawImage(imgUrl5, -35, 0, 60, 60);
        } else {
            ctx.drawImage(imgUrl6, -35, 0, 60, 60);
        }*/
        ctx.restore(); //很关键
    }
}

function changeBg(eleId) {
    // 有性能问题
    var bg = ['url("./img/wheel-bg-2.png")', 'url("./img/wheel-bg.png")'];
    document.getElementById(eleId).style.backgroundImage = bg[index%2];
    index ++;
}

