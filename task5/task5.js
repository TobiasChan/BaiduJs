//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener){
    if(element.addEventListener){
        element.addEventListener(event, listener, false);
    }
    else if(element.attachEvent){
        element.attachEvent("on"+event, listener);
    }
    else{
        element["on"+event]=listener;
    }
}

//绑定事件
var data=[];
var bth=document.getElementsByTagName('input')
var input=bth[0];
var leftIn=bth[1];
var rightIn=bth[2];
var leftOut=bth[3];
var rightOut=bth[4];
var random=bth[5];
var sort=bth[6];
var ul=document.getElementById('container');

//在<ul>里面创建标签<li>
function createValue(el,value){
	el=document.createElement('li');
	el.style.height=value+'px';
	return el;
}

//左侧入
function leftInFunc(value){
	if(data.length>60){
		alert("队列已满！");
		return false;
	}
	else{
		var li=createValue(li,value);
		data.unshift(value);
		ul.insertBefore(li,ul.firstChild);
	}
}
addEvent(leftIn,"click",function(){
	var value=parseInt(input.value);
	/^([0-9]{2}|100)$/.test(value) ? leftInFunc(value*2) : alert('请输入10-100的整数');
});

//右侧入
function rightInFunc(value) {
	if(data.length>60){
		alert("队列已满！");
		return false;
	}
	else{
		var li=createValue(li,value);
		data.push(value);
		ul.appendChild(li);
	}
}
addEvent(rightIn,"click",function(){
	var value=parseInt(input.value);
	/^([0-9]{2}|100)$/.test(value) ? rightInFunc(value*2) : alert('请输入10-100的整数');
});

//左侧出
function leftOutfunc(){
	if (ul.firstChild != null){
		data.shift();
		ul.removeChild(ul.firstChild);
	}
	else{
		alert("已经没有数据可以移除！")
	}
}
addEvent(leftOut,"click",leftOutfunc);

//右侧出
function rightOutFunc(){
	if (ul.lastChild != null){
		data.pop();
		ul.removeChild(ul.lastChild);
	}
	else{
		alert("已经没有数据可以移除！")
	}
}
addEvent(rightOut,"click",rightOutFunc);

//随机加入30个元素
function randomFunc() {
	data.length=0;
	ul.innerHTML=null;
	for(var i=0; i<30; i++){
		leftInFunc((parseInt(Math.random()*90+10))*2);
	};
}
addEvent(random,"click",randomFunc);

//冒泡排序
function sortFunc(el) {
	var len=data.length,
		li=el,
		i=0,
		j=0,
		temp;
	var clear=setInterval(run,15);

	function run(){
		if(i < len){
			if (j < len-i-1){
				if(data[j] > data[j+1]){
					temp=data[j];
					data[j]=data[j+1];
					data[j+1]=temp;
					li[j].style.height=data[j]+'px';
					li[j+1].style.height=data[j+1]+'px';
				}
				j++;
				return false;
			}
			else{
				j=0;//这组if-else相当于for"(var j=0; j<len-i-1; j++)"
			}
			i++;
		}
		else{
			clearInterval(clear);//这组if-else相当于"for(var i=0; i<len; i++)"
		}
	}
}
addEvent(sort,"click",function(){
	var li=ul.getElementsByTagName('li');
	sortFunc(li);
});

/*
简易排序
function sortFunc(el) {
	var len=data.length,
		li=el,
		temp;
	run();

	function run(){
		for(var i=0; i<len; i++){
			for(var j=0; j<len-i-1; j++){
				if(data[j] > data[j+1]){
					temp=data[j];
					data[j]=data[j+1];
					data[j+1]=temp;
					li[j].style.height=data[j]+'px';
					li[j+1].style.height=data[j+1]+'px';
				}
			}
		}
	}
}
addEvent(sort,"click",function(){
	var li=ul.getElementsByTagName('li');
	sortFunc(li);
});
*/