function getStyle(obj,name){
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
}


function move(obj,json,options){  
	var start = {};//放初始的样式
	var dis = {};//距离一组
	options = options||{};
	options.time = options.time||700;//时间  duration complete easing
	options.type = options.type||'ease-out';//运动类型 加速 减速 匀速
	
	//初始值  dis 初始化
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];
	}
	var count = Math.round(options.time/30);
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			switch(options.type){
				case 'linear':
					var cur = start[name] + dis[name]*n/count;
					break;
				case 'ease-in':
					var a = n/count;
					var cur = start[name] + dis[name]*Math.pow(a,3);
					break;
				case 'ease-out':
					var a = 1 - n/count;
					var cur = start[name] + dis[name]*(1-Math.pow(a,3));
					break;
			};
			//console.log(n/count);
			
			
			if(name == 'opacity'){
				obj.style[name] = cur;
				obj.style.filter = 'alpha(opacity:'+cur*100+')';
			}else{
				
				obj.style[name] = cur+'px';
			}
		}
		
		if(n == count){
			clearInterval(obj.timer);
			options.end&&options.end();
		}
		
	},30);
}











