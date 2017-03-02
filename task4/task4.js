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
var input=document.getElementById('input');
var leftIn=document.getElementById('left-in');
var rightIn=document.getElementById('right-in');
var leftOut=document.getElementById('left-out');
var rightOut=document.getElementById('right-out');
var div=document.getElementById('container');

//左侧入
function leftInFunc(){
	var items="";
	if (input.value.match(/^[0-9]+$/)) {
		items+="<div>"+input.value+"</div>";
		data.unshift(items);
		div.innerHTML=data.join('');
		return data;
	}
	else {
		alert("请输入数字！");
	}
}
addEvent(leftIn,"click",leftInFunc);

//右侧入
function rightInFunc(){
	var items="";
	if (input.value.match(/^[0-9]+$/)) {
		items+="<div>"+input.value+"</div>";
		data.push(items);
		div.innerHTML=data.join('');
		return data;
	}
	else {
		alert("请输入数字！");
	}
}
addEvent(rightIn,"click",rightInFunc);

//左侧出
function leftOutFunc(){
	data.shift(data[0]);
	div.innerHTML=data.join('');
	return data;
}
addEvent(leftOut,"click",leftOutFunc);

//右侧出
function rightOutFunc(){
	data.pop(data.lastChild);
	div.innerHTML=data.join('');
	return data;
}
addEvent(rightOut,"click",rightOutFunc);
