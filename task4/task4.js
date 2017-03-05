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
var value=input.value;

function renderFunc() {
    div.innerHTML = "";
    for (var i=0; i<data.length; i++){
        var index=i;
        var span=document.createElement("span");
        var value=data[i];
        span.innerHTML=value;
        span.setAttribute("id",index);
        container.appendChild(span);
        addEvent(span,"click",deleteValue);
    }
}

function deleteValue(){
    var id=event.target.id;
    data.splice(id,1);
    renderFunc();
}

addEvent(leftIn,"click",function(){
	var value=input.value;
	console.log(value);
	if (value.match(/^[0-9]+$/)){
		data.unshift(value);
		renderFunc();
	}
	else {
		alert("请输入数字！");
	}
});

addEvent(rightIn,"click",function(){
	var value=input.value;
	if (value.match(/^[0-9]+$/)){
		data.push(value);
		renderFunc();
	}
	else {
		alert("请输入数字！");
	}
});

addEvent(leftOut,"click",function(){
	data.shift(value);
	renderFunc();
});

addEvent(rightOut,"click",function(){
	data.pop(value);
	renderFunc();
});

/*--
//左侧入
function leftInFunc(){
	var items="";
	if (input.value.match(/^[0-9]+$/)) {
		items+="<div>"+input.value+"</div>";
		data.unshift(items);
		div.innerHTML=data.join('');
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
}
addEvent(leftOut,"click",leftOutFunc);

//右侧出
function rightOutFunc(){
	data.pop(data.lastChild);
	div.innerHTML=data.join('');
}
addEvent(rightOut,"click",rightOutFunc);
--*/
