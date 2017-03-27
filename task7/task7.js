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
var btn=document.getElementsByTagName('input'),
	preBth=btn[0],
	inBth=btn[1],
	postBth=btn[2],
	treeRoot=document.getElementsByClassName('root')[0],
	divList=[],
	timer=null;

//加载
addEvent(window,"load",function(){
	//调用前序函数
	addEvent(preBth,"click",function(){
		reset();
		preOrder(treeRoot);
		changeColor();
	});
	//调用中序函数
	addEvent(inBth,"click",function(){
		reset();
		inOrder(treeRoot);
		changeColor();
	});
	//调用后序函数
	addEvent(postBth,"click",function(){
		reset();
		postOrder(treeRoot);
		changeColor();
	});
});

//前序函数
function preOrder(node){
	if (!(node==null)) {
		divList.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild);
	}
}

//中序函数
function inOrder(node){
	if (!(node==null)) {
		inOrder(node.firstElementChild);
		divList.push(node);
		inOrder(node.lastElementChild);
	}
}

//后序函数
function postOrder(node){
	if (!(node==null)) {
		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild);
		divList.push(node);
	}
}

//改变背景颜色
function changeColor(){
	var i=0;
	divList[i].style.backgroundColor='blue'
	timer=setInterval(function(argument){
		i++;
		if (i<divList.length) {
			divList[i-1].style.backgroundColor='#fff';
			divList[i].style.backgroundColor='blue';
		} else {
			clearInterval(timer);
			divList[divList.length-1].style.backgroundColor='#fff';
		}
	},500);
}

//复位背景颜色
function reset(){
	divList=[];
	clearInterval(timer);
	var divs=document.getElementsByTagName('div');
	for (var i=0; i<divs.length; i++) {
		divs[i].style.backgroundColor='#fff';
	}
}