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
	depthBth=btn[0],
	breadthBth=btn[1],
	depthSBth=btn[2],
	breadthSBth=btn[3],
	match=btn[4],
	delBth=btn[5],
	addBth=btn[6],
	data=btn[7],
	treeRoot=document.getElementsByClassName('root')[0],
	divList=[],
	textList=[],
	BFindex=0,
	selectDiv,
	timer=null;

//加载
addEvent(window,"load",function(){
	//调用深度遍历函数
	addEvent(depthBth,"click",function(){
		reset();
		TraversalDF(treeRoot);
		console.log(treeRoot)
		changeColor();
	});
	//调用广度遍历函数
	addEvent(breadthBth,"click",function(){
		BFindex=0;
		reset();
		TraversalBF(treeRoot);
		changeColor();
	});
	//调用深度遍历搜索函数
	addEvent(depthSBth,"click",function(){
		reset();
		TraversalDF(treeRoot);
		SchangeColor();
	});
	//调用广度遍历搜索函数
	addEvent(breadthSBth,"click",function(){
		BFindex=0;
		reset();
		TraversalBF(treeRoot);
		SchangeColor();
	});
	
	//点击相应的box背景变色
    var levels=document.getElementsByTagName('div');
    for (var i=0; i<levels.length; i++) {
        addEvent(levels[i],"click",function(e){
            reset();
            this.style.backgroundColor='red';
            e.stopPropagation(); //阻止事件冒泡
            selectDiv=this; //记录被选中的box
        });
    }

    //删除选中节点
    addEvent(delBth,"click",function(){
    	selectDiv.parentNode.removeChild(selectDiv);
    });

    //在选中节点中添加子节点
    addEvent(addBth,"click",function(){
    	reset();
    	var newNode=document.createElement("div");
    	if (!(data.value.trim())=="") {
    		if ((Number(selectDiv.offsetHeight))>44) {
    			selectDiv.appendChild(newNode);
    			newNode.innerHTML=data.value.trim();
    			newNode.className=newNode.parentNode.className;
    			newNode.style.height=newNode.parentNode.offsetHeight-44+"px";
    			newNode.style.border="2px solid pink";
    		} else {
    			alert("请到其他box内添加节点。");
    		}
    	} else {
    		alert("请输入box名称!");
    	}
    		
    	//点击相应的box背景变色
    	var levels=document.getElementsByTagName('div');
    	for (var i=0; i<levels.length; i++) {
        	addEvent(levels[i],"click",function(e){
            	reset();
            	this.style.backgroundColor='red';
            	e.stopPropagation();//阻止事件冒泡
            	selectDiv=this;
        	});
    	}
    });
});

//深度遍历函数
function TraversalDF(node){
	if (node) {
		divList.push(node); 
		textList.push(node.firstChild.nodeValue.trim());
		for (var i=0; i<node.children.length; i++) {
			TraversalDF(node.children[i]);
		}
	}
}

//广度遍历函数
function TraversalBF(node){
	if ((node) && (node.tagName==="DIV")) {
		divList.push(node);
		textList.push(node.firstChild.nodeValue.trim());
		TraversalBF(node.nextElementSibling);
		node=divList[BFindex++];
		TraversalBF(node.firstElementChild);
		}
	}

//非搜索函数的渲染动画
function changeColor(){
	var i=0;
	divList[i].style.backgroundColor="blue";
	timer=setInterval(function(){
		i++;
		if (i<divList.length) {
			divList[i-1].style.backgroundColor="#fff";
			divList[i].style.backgroundColor="blue";
		} else {
			clearInterval(timer);
			divList[divList.length-1].style.backgroundColor="#fff";
		}
	},500);
}

//搜索函数的渲染动画
function SchangeColor(){
	var i=0;
	divList[i].style.backgroundColor="blue";
	var value=match.value.trim();
	timer=setInterval(function(){
		i++;
		if (i<divList.length) {
			divList[i-1].style.backgroundColor="#fff";
			if (value === textList[i]) {
				divList[i].style.backgroundColor="red";
				selectDiv=divList[i];
				clearInterval(timer);
			} else {
			divList[i].style.backgroundColor="blue";
			}
		} else {
			divList[divList.length-1].style.backgroundColor="#fff";
			alert("你所寻找的数据不存在！");
			clearInterval(timer);
		}
	},500)
}

//复位函数
function reset(){
	divList=[];
	textList=[];
	clearInterval(timer);
	var divs=document.getElementsByTagName('div');
	for (var i=0; i<divs.length; i++) {
		divs[i].style.backgroundColor="#fff";
	}
}