/**
 * Created by Administrator on 2017/4/12.
 */
//音乐的播放和暂停
var Audio_btn=document.getElementById("audio_btn");
var Music=document.getElementById("music");
var a=1;
Audio_btn.onclick=function () {
    a = a == 1 ? 0 : 1;
    if (a==0){
        Music.pause();
        Audio_btn.style.animation="none";
        Audio_btn.style.webkitAnimation="none";
        Audio_btn.style.mozAnimation="none";
        Audio_btn.style.msAnimation="none";
        Audio_btn.style.oAnimation="none";
    }else {
        Music.play();
        Audio_btn.style.animation="revolve 1s linear infinite";
        Audio_btn.style.webkitAnimation="revolve 1s linear infinite";
        Audio_btn.style.mozAnimation="revolve 1s linear infinite";
        Audio_btn.style.msAnimation="revolve 1s linear infinite";
        Audio_btn.style.oAnimation="revolve 1s linear infinite";
    }
}
//相册盒子的轮播
//得到所有的Main_page
var Main_page=document.querySelectorAll('.main-page');

//得到窗口的高度
var windowHeight = document.documentElement.clientHeight;

//所有Main_page就位
for(var i = 1 ; i < Main_page.length ; i++){
    Main_page[i].style.webkitTransform = "translateY(" + windowHeight + "px)";
}
//监听就是给document对象
document.addEventListener("touchstart", touchstartHandler, false);
document.addEventListener("touchmove", touchmoveHandler, false);
document.addEventListener("touchend", touchendHandler, false);


//开始滑动的手指位置
var startY;
//滑动的距离
var distanceY;

//三个相关的Main_page
var idx = 0;
var prev = NaN;
var next = 1;

//函数截流
lock = true;

// 触摸开始
function touchstartHandler(event){
    //开始值
    startY = event.touches[0].clientY;

    //去掉所有的过渡
    Main_page[idx].style.transition = "none";
    !isNaN(next) && (Main_page[next].style.transition = "none");
    !isNaN(prev) && (Main_page[prev].style.transition = "none");

    Main_page[idx].style.zIndex = 888;
    !isNaN(next) && (Main_page[next].style.zIndex = 999);
    !isNaN(prev) && (Main_page[prev].style.zIndex = 999);
}

// 触摸移动
function touchmoveHandler(event){
    //y是手指的位置减去误差
    distanceY = event.touches[0].clientY - startY;

    //到头了
    if(idx == 0 && distanceY > 0){
        return;
    }else if(idx == 5 && distanceY < 0){
        return;
    }


    if(distanceY < 0){
        //滑动的时候改变transform：
        Main_page[idx].style.webkitTransform = "scale(" + (1 - Math.abs(distanceY) / windowHeight) + ")";
        !isNaN(next) && (Main_page[next].style.webkitTransform = "scale(1) translateY(" + (windowHeight + distanceY) + "px)");
    }else if(distanceY > 0){
        Main_page[idx].style.webkitTransform = "scale(" + (1 - Math.abs(distanceY) / windowHeight) + ")";
        !isNaN(prev) && (Main_page[prev].style.webkitTransform = "scale(1) translateY(" + (-windowHeight + distanceY) + "px)");
    }
}

// 触摸结束
function touchendHandler(event){
    //到头了
    if(idx == 0 && distanceY > 0){
        return;
    }else if(idx == 5 && distanceY < 0){
        return;
    }

    //根据distanceY来确定是否滑动成功
    if(distanceY < -windowHeight / 4){
        //向上滑动成功
        console.log("↑")

        //先改变信号量
        prev = idx;
        idx = next;
        next++;
        if(next > 5){
            idx = 5;
            next = NaN;
        }

        console.log(prev,idx,next)

        //加上过渡
        !isNaN(prev) && (Main_page[prev].style.transition = "all 0.4s ease 0s");
        Main_page[idx].style.transition = "all 0.4s ease 0s";

        //最终的位置
        Main_page[prev].style.webkitTransform = "scale(0)";
        Main_page[idx].style.webkitTransform = "translateY(0px)";

    }else if(distanceY > windowHeight / 4){
        console.log("↓")

        //先改变信号量
        next = idx;
        idx = prev;
        prev--;
        if(prev < 0){
            idx = 0;
            prev = NaN;
        }

        console.log(prev,idx,next)

        //加上过渡
        !isNaN(next) && (Main_page[next].style.transition = "all 0.4s ease 0s");
        Main_page[idx].style.transition = "all 0.4s ease 0s";

        //最终的位置
        Main_page[next].style.webkitTransform = "scale(0)";
        Main_page[idx].style.webkitTransform = "translateY(0px)";
    }else{
        Main_page[idx].style.transition = "all 0.4s ease 0s";
        !isNaN(prev) && (Main_page[prev].style.transition = "all 0.4s ease 0s");
        !isNaN(next) && (Main_page[next].style.transition = "all 0.4s ease 0s");


        Main_page[idx].style.webkitTransform = "scale(1)";
        !isNaN(prev) && (Main_page[prev].style.webkitTransform = "translateY(" + -windowHeight + "px)");
        !isNaN(next) && (Main_page[next].style.webkitTransform = "translateY(" + windowHeight + "px)");

    }


    inAnimate[idx]();
}


//入场动画
var inAnimate = [function(){},function(){},function(){},function(){},function(){},function(){}];
