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
var tip=document.getElementsByTagName('p')[0],
	btn=document.getElementsByTagName('input'),
	text=btn[0],
	button=btn[1];

//验证函数
addEvent(button,"click",function(){
	var value=text.value.trim();
	if ( countLength(value)==0 ) {
		tip.innerHTML="名称不能为空";
		tip.style.color="red";
		text.style.border="1px solid red";
	} else if ( countLength(value)>=4 && countLength(value)<=16) {
		tip.innerHTML="格式正确";
		tip.style.color="green";
		text.style.border="1px solid green";
	} else {
		tip.innerHTML="长度为4～16个字符";
		tip.style.color="gray";
		text.style.border="1px solid gray";
	}
});

//检验字符串长度函数
function countLength(str){
	var inputLength=0;
	for (var i=0; i<str.length; i++) {
		var countCode=str.charCodeAt(i);//返回指定位置的字符的Unicode编码
		if ( (countCode>=0) && (countCode<=128)) {
			inputLength+=1;//字符为字母或数字
		} else {
			inputLength+=2;//字符为汉字
		}
	}
	return inputLength;
}