//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on"+event, listener);
    }
    else {
        element["on"+event]=listener;
    }
}

//绑定事件
var order=document.getElementById('order');
var act=document.getElementById('action');
var mybox=document.getElementById('myBox');
var btn=document.getElementsByClassName('button');
var angle=0;//角度计数
var count=1;//计算步数

//判断函数
function takeOrder() {
    var value=order.value.toLocaleUpperCase();
    //TUN系列动作判断
    if (value=="TUN LEF") {
        //为了不出现负方向先进行判断
        if (count==1) {
        	count=4;
        } else {
        	count=(count-1)%4;
        }
        mybox.style.transform="rotate("+(angle-90)+"deg)";
        angle=-90+angle;
        console.log(count);
    }
    if (value=="TUN RIG") {
        if (count==3) {
        	count=4;
        } else {
        	count=(count+1)%4;
        }
        mybox.style.transform="rotate("+(angle+90)+"deg)";
        angle=90+angle;
        console.log(count);
    }
    if (value=="TUN BAC") {
        if (count==2) {
        	count=4;
        } else {
        	count=(count+2)%4;
        }
        mybox.style.transform="rotate("+(angle+180)+"deg)";
        angle=180+angle;
        console.log(count);
    }

    //TRA系列动作判断
    if (value=="TRA LEF") {
        mybox.style.left=="0px" ? alert("出界") : mybox.style.left=(parseInt(mybox.style.left)-40)+"px";
    }
    if (value=="TRA TOP") {
        mybox.style.top=="0px" ? alert("出界") : mybox.style.top=(parseInt(mybox.style.top)-40)+"px";
    }
    if (value=="TRA RIG") {
        mybox.style.left=="360px" ? alert("出界") : mybox.style.left=(parseInt(mybox.style.left)+40)+"px";
    }
    if (value=="TRA BOT") {
        mybox.style.top=="360px" ? alert("出界") : mybox.style.top=(parseInt(mybox.style.top)+40)+"px";
    }

    //MOV系列动作判断
    if (value=="MOV LEF") {
        if (count==1) {
            mybox.style.transform="rotate("+(angle-90)+"deg)";
            angle=-90+angle;
        } else if (count==2) {
            mybox.style.transform="rotate("+(angle+180)+"deg)";
            angle=180+angle;
        } else if (count==3) {
            mybox.style.transform="rotate("+(angle+90)+"deg)";
            angle=90+angle;
        }
        count=4;
        mybox.style.left=="0px" ? alert("出界") : mybox.style.left=(parseInt(mybox.style.left)-40)+"px";
    }
    if (value=="MOV TOP") {
        if (count==2) {
            mybox.style.transform="rotate("+(angle-90)+"deg)";
            angle=-90+angle;
        } else if (count==3) {
            mybox.style.transform="rotate("+(angle+180)+"deg)";
            angle=180+angle;
        } else if (count==4) {
            mybox.style.transform="rotate("+(angle+90)+"deg)";
            angle=90+angle;
        }
        count=1;
        mybox.style.top=="0px" ? alert("出界") : mybox.style.top=(parseInt(mybox.style.top)-40)+"px";
    }
    if (value=="MOV RIG") {
        if (count==3) {
            mybox.style.transform="rotate("+(angle-90)+"deg)";
            angle=-90+angle;
        } else if (count==4) {
            mybox.style.transform="rotate("+(angle+180)+"deg)";
            angle=180+angle;
        } else if (count==1) {
            mybox.style.transform="rotate("+(angle+90)+"deg)";
            angle=90+angle;
        }
        count=2;
        mybox.style.left=="360px" ? alert("出界") : mybox.style.left=(parseInt(mybox.style.left)+40)+"px";
    }
    if (value=="MOV BOT") {
        if (count==4) {
            mybox.style.transform="rotate("+(angle-90)+"deg)";
            angle=-90+angle;
        } else if (count==1) {
            mybox.style.transform="rotate("+(angle+180)+"deg)";
            angle=180+angle;
        } else if (count==2) {
            mybox.style.transform="rotate("+(angle+90)+"deg)";
            angle=90+angle;
        }
        count=3;
        mybox.style.top=="360px" ? alert("出界") : mybox.style.top=(parseInt(mybox.style.top)+40)+"px";
    }

    //GO动作判断
    if (value=="GO") {
        if(count==1) {
            mybox.style.top=="0px" ? alert("出界") : mybox.style.top=(parseInt(mybox.style.top)-40)+"px";
        };
        if(count==2) {
            mybox.style.left=="360px" ? alert("出界") : mybox.style.left=(parseInt(mybox.style.left)+40)+"px";
        };
        if(count==3) {
            mybox.style.top=="360px" ? alert("出界") : mybox.style.top=(parseInt(mybox.style.top)+40)+"px";
        };
        if(count==4) {
            mybox.style.left=="0px" ? alert("出界") : mybox.style.left=(parseInt(mybox.style.left)-40)+"px";
        };
    }
}

//调用函数
addEvent(act,"click",takeOrder);
