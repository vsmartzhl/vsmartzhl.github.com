
;(function($){
	$.extend({
	    template: function(id,data) {
	        var wrapParent = $('#'+id);
			var tplhtml = $(wrapParent).attr("data-html");
			var tplstr = $('#'+tplhtml).html();

			var re = /{{\s*(\w+)\s*}}/g;

			var trueEleLen = jQuery.parseHTML($('#'+tplhtml).html());
			var otplTureNum = 0;
			for(var i=0; i<trueEleLen.length;i++){
				if(trueEleLen[i].nodeType == 1){
					otplTureNum++;
				}
			}

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

					if($(objChild[i]).children().length){
						var ntempArr = $(objChild[i]).find("*["+attr+"]");
						$(ntempArr).each(function(index,ele){
							var strDataIf = $(ele).attr(attr);
							var strMatch = $(ele).attr(attr) ? $(ele).attr(attr).match(reg)[0] : '';
							if(strMatch){
								strDataIf = strDataIf.replace(reg,data instanceof Array ? data[Math.floor(i/otplTureNum)][strMatch] : data[strMatch]);
								if(eval(strDataIf) == true){
									if(attr == "data-if"){
										$(objChild[i]).append($(ele));	
									}else if(attr == "data-show"){
										$(ele).show();
									}
									
								}else if(eval(strDataIf) == false){
									if(attr == "data-if"){
										$(ele).remove();
									}else if(attr == "data-show"){
										$(ele).hide();
									}	
								}
							}	
						});
					}else{
						var strDataIf = $(objChild[i]).attr(attr);
						var strMatch = $(objChild[i]).attr(attr) ? $(objChild[i]).attr(attr).match(reg)[0] : '';
						if(strMatch){
							strDataIf = strDataIf.replace(reg,data instanceof Array ? data[Math.floor(i/otplTureNum)][strMatch] : data[strMatch]);
							if(eval(strDataIf) == true){
								if(attr == "data-if"){
									$(objChild[i]).insertBefore($(objChild[i+1]));
								}else if(attr == "data-show"){
									$(objChild[i]).show();
								}
								
							}else if(eval(strDataIf) == false){
								if(attr == "data-if"){
									$(objChild[i]).remove();
								}else if(attr == "data-show"){
									$(objChild[i]).hide();
								}	
							}
						}	
					}	
				}
			}
	    }
	});
})($);
