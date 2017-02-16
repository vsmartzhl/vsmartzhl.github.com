window.onload=function ()
{
	var oDiv=document.getElementById('div1');
	var oNavBox=oDiv.children[0];
	var oUl=oDiv.children[1];
	var aLi=oUl.children;
	
	var opened=false;
	
	var ready=true;
	
	for(var i=0;i<aLi.length;i++)
	{
		if(i%2==1)
		{
			aLi[i].style.left=-aLi[i].offsetWidth+'px';
		}
		else
		{
			aLi[i].style.left=aLi[i].offsetWidth+'px';
		}
		aLi[i].style.display='none';
	}
	
	oNavBox.onclick=function ()
	{
		if(!ready)return;
		
		ready=false;
		if(opened)
		{
			oNavBox.className='navBox';
			
			//收起来
			var i=aLi.length-1;
			var timer=setInterval(function (){
				var left=i%2?-aLi[i].offsetWidth:aLi[i].offsetWidth;
				
				(function (i){
					startMove(aLi[i], {left: left, opacity: 0}, function (){
						aLi[i].style.display='none';
						
						if(i==0)ready=true;
					});
				})(i);
				
				i--;
				if(i==-1)
				{
					clearInterval(timer);
				}
			}, 77);
		}
		else
		{
			oNavBox.className='navBox nav_active';
			
			//展开
			var i=0;
			var timer=setInterval(function (){
				aLi[i].style.display='block';
				(function (i){
					startMove(aLi[i], {left: 0, opacity: 100}, function (){
						if(i==aLi.length-1)ready=true;
					});
				})(i);
				
				i++;
				if(i==aLi.length)
				{
					clearInterval(timer);
				}
			}, 77);
		}
		
		if(opened)
		{
			opened=false;
		}
		else
		{
			opened=true;
		}
	};
	
	//aLi加点击——字上去、收起来
	for(var i=0;i<aLi.length;i++)
	{
		aLi[i].onclick=function ()
		{
			oNavBox.className='navBox';
			var oSpan=oNavBox.children[0];
			
			opened=false;
			
			oSpan.innerHTML=this.children[0].innerHTML;
			
			var i=aLi.length-1;
			var timer=setInterval(function (){
				var left=i%2?-aLi[i].offsetWidth:aLi[i].offsetWidth;
				
				(function (i){
					startMove(aLi[i], {left: left, opacity: 0}, function (){
						aLi[i].style.display='none';
					});
				})(i);
				
				i--;
				if(i==-1)
				{
					clearInterval(timer);
				}
			}, 77);
		};
	}
	(function (){
		var oS=document.createElement('script');
			
		oS.type='text/javascript';
		oS.src='http://www.zhinengshe.com/zpi/zns_demo.php?id=3542';
			
		document.body.appendChild(oS);
	})();
};