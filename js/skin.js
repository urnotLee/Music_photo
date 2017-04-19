/**
 * Created by Administrator on 2017/4/11.
 */
//链接的样式  换肤用的
var oSkin=document.getElementById("skin");
//换肤的图标
var oSkin_icon=document.getElementById("skin_icon");
//点击换肤出现的皮肤样式
var oSkin_ic=document.getElementById("skin_ic");
//皮肤样式1
var skin1=document.getElementById("skin1");
//皮肤样式2
var skin2=document.getElementById("skin2");
//皮肤样式3
var skin3=document.getElementById("skin3");
//皮肤样式4
var skin4=document.getElementById("skin4");
//让皮肤图标出现
var a=1;
oSkin_icon.addEventListener("click",function () {
    a = a == 1 ? 0 : 1;
    if(a==0){
        disappear("block");
    }else {
        disappear("none")
    }
},true);
//封装一个函数disappear让皮肤显示或隐藏和换肤
function disappear(n,URL) {
    if (arguments.length > 2 || arguments.length == 0 ||
    typeof arguments[0] != "string") {
        throw new Error("对不起，你传进来的参数数量不对或者参数类型不对，请仔细检查哦！");
        return;
    } else if (arguments.length == 1) {
        if (n.length < 6) {
            oSkin_ic.style.display = n;
        } else if (n.length > 6) {
            oSkin_ic.style.display = null;
            oSkin.href = URL;
        }
    } else if (arguments.length == 2) {
        oSkin_ic.style.display = n;
        oSkin.href = URL;
    }
}
//调用函数disappear()
skin1.addEventListener("click",function () {
    disappear("none","../css/skin1.css");
},false);
skin2.addEventListener("click",function () {
    disappear("none","../css/skin2.css");
},false);
skin3.addEventListener("click",function () {
    disappear("none","../css/skin3.css");
},false);
skin4.addEventListener("click",function () {
    disappear("none","../css/skin4.css");
},false);

