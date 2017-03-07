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
var data=[];
var text=document.getElementById('text'),
	importData=document.getElementById('import'),
	input=document.getElementById('input'),
	search=document.getElementById('search'),
	container=document.getElementById('container');

//排列输入元素
function renderFunc() {
    container.innerHTML = "";
    for (var i=0; i<data.length; i++){
        var div=document.createElement("div");
        var value=data[i];
        div.innerHTML=value;
        container.appendChild(div);
    }
}

//将textarea输入的字符串拆分成数组
addEvent(importData,"click",function(){
	var value=text.value.trim();
	var eData=value.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/); //以标点符号为界分割字符串成数组
	if (eData[eData.length-1] === "") { //检测最后一个字符串是否标点符号
		eData.length=eData.length-1;
	}
	if (eData[0] === "") { ////检测第一个字符串是否标点符号
		eData.shift();
	}
	for(var j=0; j<eData.length; j++){
		data.push(eData[j]);
		renderFunc();
	}
});

//改变text选中的字符串的背景色
addEvent(search,"click",function(){
	var match=input.value;
	var regMatch=new RegExp(match,'gi');
	console.log(data);
	console.log(regMatch);
	for(var i=0; i<data.length; i++){
		if (data[i].indexOf(match) != -1) {
			data[i]=data[i].replace(regMatch,"<span class='change'>"+match+"</span>");
		}
	}
	renderFunc();
});