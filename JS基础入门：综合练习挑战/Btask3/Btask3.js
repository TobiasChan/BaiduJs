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
var inSchool=document.getElementById('inSchool');
var outSchool=document.getElementById('outSchool');
var list=document.getElementsByClassName('list');
var school=document.getElementById('school');
var company=document.getElementById('company');
var city=document.getElementById('city');
var btn=city.getElementsByTagName('option');
var university=document.getElementById('university');
var gz=["中山大学","华南理工大学","广州大学"];
var bj=["清华大学","北京大学"];
var sh=["复旦大学","上海交通大学"];

//点击"在校生"时，改变"radio"效果，隐藏"非在校生"信息
addEvent(inSchool,"click",function(){
	list[0].style.backgroundColor="#0072e3";
	list[1].style.backgroundColor="#fff";
	school.style.display="block";
	company.style.display="none";
});
//点击"非在校生"时，改变"radio"效果，隐藏"在校生"信息
addEvent(outSchool,"click",function(){
	list[1].style.backgroundColor="#0072e3";
	list[0].style.backgroundColor="#fff";
	school.style.display="none";
	company.style.display="block";
});

//实现联动效果
addEvent(city,"change",function(){
	reset();
	var selected=city.value;
	if (selected=="gz") {
		for (var i=0; i<gz.length; i++) {
			var opt=document.createElement('option');
			opt.innerHTML=gz[i];
			university.appendChild(opt);
		}
	} else if (selected=="bj") {
		for (var i=0; i<bj.length; i++) {
			var opt=document.createElement('option');
			opt.innerHTML=bj[i];
			university.appendChild(opt);
		}
	} else if (selected=="sh") {
		for (var i=0; i<sh.length; i++) {
			var opt=document.createElement('option');
			opt.innerHTML=sh[i];
			university.appendChild(opt);
		}
	}
});

//重置大学信息
function reset(){
	var c_length=university.options.length;
	if (c_length>1) {
		for (var i=0; i<c_length; i++) {
			university.options.remove(c_length-i);
		}
	}
}