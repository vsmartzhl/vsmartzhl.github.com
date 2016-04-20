window.onload=function(){
	// 简易时钟
	(function(){
		var oClock = document.querySelector('.clock');
		var oHou = document.querySelector('.hou');
		var oMin = document.querySelector('.min');
		var oSec = document.querySelector('.sec');
		
		var N = 60;
		for(var i=0;i<N;i++){
			var oS = document.createElement('span');
			oS.style.WebkitTransform='rotate('+i*6+'deg)';
			if(i%5==0){
				oS.className='bigScale';
				if(i/5==0){
					oS.innerHTML = '<strong>'+12+'<\/strong>';
				}else{
					oS.innerHTML = '<strong>'+i/5+'<\/strong>';
				}
				var oStrong = oS.children[0];
				oStrong.style.WebkitTransform='rotate('+-i*6+'deg)';
			}
			oClock.appendChild(oS);
		}
		
		
		function tick(){
			var oDate = new Date();
			var h = oDate.getHours();
			var m = oDate.getMinutes();
			var s = oDate.getSeconds();
			var ms = oDate.getMilliseconds()
			oHou.style.WebkitTransform = 'rotate('+(h*30+(m/60*30))+'deg)';
			oMin.style.WebkitTransform = 'rotate('+(m*6+(s/60*6))+'deg)';
			oSec.style.WebkitTransform = 'rotate('+(s*6+(ms/1000*6))+'deg)';
		};
		tick();
		setInterval(tick,1);
	})();

	// 百叶窗菜单
	(function(){
		var oUl = document.getElementById('byc');
		var oUl2 = document.getElementById('byc2');
		toShow(oUl);
		setTimeout(function(){
			toShow(oUl2);
		},2000);
		
		function toShow(obj){
			var aDiv = obj.getElementsByTagName('div');
			var iNow = 0;
			var timer = null;
			var allTimer = null;
			var onOff = true;
			clearInterval(allTimer);

			allTimer = setInterval(function(){
				toChange();
			},4000);

			function toChange(){
				clearInterval(timer);
				timer = setInterval(function(){
					if(iNow == aDiv.length){
						clearInterval(timer);
						iNow = 0;
						onOff = !onOff;
					}else if(onOff){
						startMove(aDiv[iNow], {top:0});
						iNow ++;
					}else{
						startMove(aDiv[iNow], {top:-30});
						iNow ++;
					}
					
				},100);
			}
		}
	})();
};
