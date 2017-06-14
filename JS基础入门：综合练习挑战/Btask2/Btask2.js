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
var oText=document.getElementsByTagName('input');
var oTip=document.getElementsByTagName('p');
var button=document.getElementsByTagName('button')[0];
var hintText=[
		{hint:"请输入长度为4～16个字符",right:"名称格式正确",wrong:"名称格式有误"},
        {hint:"请输入4～16个数字或字母",right:"密码可用",wrong:"密码不可用"},
        {hint:"请再次输入密码",right:"密码输入一致",wrong:"密码输入不一致"},
        {hint:"请输入邮箱",right:"邮箱格式正确",wrong:"邮箱格式错误"},
        {hint:"请输入手机号码",right:"手机格式正确",wrong:"手机格式错误"}
    ];
var flag=[false,false,false,false,false];

//处理事件
for (let i=0; i<oText.length; i++) {
	addEvent(oText[i],"focus",function(){
		oTip[i].innerHTML=hintText[i].hint;
		oTip[i].style.color="grey";
		oText[i].style.border="1px solid red";
		oTip[i].style.display="block";
	});
	addEvent(oText[i],"blur",function(){
		var value=oText[i].value.trim();
		switch(i){
			case 0:
				flag[0]=/^[a-zA-Z0-9_]{4,16}$/.test(value.replace(/[\u0391-\uFFE5]/g,"nn"));//当输入时中文时用'nn'替代
			case 1:
				flag[1]=/^[a-zA-Z0-9_]{4,16}$/.test(value);
			case 2:
				flag[2]=(value==oText[1].value.trim());
			case 3:
				flag[3]=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/.test(value);
			case 4:
				flag[4]=/^[1][0-9]{10}$/.test(value);
		}
		if ( value=="" ) {
			oTip[i].innerHTML="输入不能为空";
			oTip[i].style.color="red";
			oText[i].style.border="1px solid red";
			oTip[i].style.display="block";
		} else if (flag[i]) {
			oTip[i].innerHTML=hintText[i].right;
			oTip[i].style.color="green";
			oText[i].style.border="1px solid green";
			oTip[i].style.display="block";
		} else {
			oTip[i].innerHTML=hintText[i].wrong;
			oTip[i].style.color="red";
			oText[i].style.border="1px solid red";
			oTip[i].style.display="block";
		}
		console.log(flag)
	});
}

addEvent(button,"click",function(){
	if ( oTip[0].style.color=="green" &&
		 oTip[1].style.color=="green" &&
		 oTip[2].style.color=="green" &&
		 oTip[3].style.color=="green" &&
		 oTip[4].style.color=="green") {
		alert("提交成功！");
	} else {
		alert("提交失败！");
	}
});
