function template(id,data){
	var wrapParent = $('#'+id);
	var tplhtml = $(wrapParent).attr("data-html");
	var tplstr = $('#'+tplhtml).html();

	var re = /{{\s*(\w+)\s*}}/g;

	if(data instanceof Array){
		var strtemp = '';
		for(var i=0; i<data.length; i++){
			strtemp += dataHtmlStr(data[i]);
		}
		$(wrapParent).html(strtemp);
	}else{
		$(wrapParent).html(dataHtmlStr(data));
	}
	
	function dataHtmlStr(data){
		return (function(){
			return tplstr.replace(re,function(matchs,key){
				return data[key];
			});
		})();
	}

	var objChild = $(wrapParent).children();
	var tplLen = data.length;

	var otplChild = jQuery.parseHTML($('#'+tplhtml).html());
	var otplnum = 0;
	for(var i=0; i<otplChild.length;i++){
		if(otplChild[i].nodeType == 1){
			otplnum++;
		}
	}

	var reg = /^[a-z|A-Z|_]+[a-z|A-Z|_|\d]*/g;

	matchStr('data-if');
	matchStr('data-show');

	function matchStr(attr){
		for(var i = 0; i<objChild.length;i++){
			var strDataIf = $(objChild[i]).attr(attr);
			var strMatch = $(objChild[i]).attr(attr) ? $(objChild[i]).attr(attr).match(reg)[0] : '';

			if(strMatch){
				strDataIf = strDataIf.replace(reg,data instanceof Array ? data[Math.floor(i/3)][strMatch] : data[strMatch]);
				if(eval(strDataIf) == true){
					$(objChild[i]).insertBefore($(objChild[i+1]));
				}else if(eval(strDataIf) == false){
					$(objChild[i]).remove();
				}
			}	
		}
	}
}