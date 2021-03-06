var SETTINGS = {
    width : 300,
    minHeight : 100,
    title:'请添加标题',
    content:'请添加文本内容！',
    mask : true,
    timeOut:'0',
    dragable:false,
    dir : 'center',
    opacity : 0.5,
    cancelBtn:true
}
var Zdialog = function(opt){

    if(this instanceof Zdialog){
        this.settings = {};
        extend(this.settings,SETTINGS);
        this.settings.closeIcon = true;
        this.settings.className = 'zdialog';
        this.settings.height = '';
        if(opt.buttons){
            this.settings.buttons = [{
                text : '确定'               
            },{
                text : '取消'               
            }]
        }else{
            this.settings.buttons = [];
        }
    }else{
        return new Zdialog(opt);
    }
    //初始化各参数
    this.settings.className ? opt.className = 'containter ' + this.settings.className + ' ' + (opt.className ? opt.className : '') : 'containter';
    this.init(opt);
    if(this.settings.dragable === true){
        new Drag('containter').init();
    }    
    return this;
};

Zdialog.prototype.init = function (opt){
    extend(this.settings,opt);   
    this.create();
}

Zdialog.prototype.create = function(){
    var self = this;
    var oContainter = null;
    this.containter = oContainter = document.createElement('div');
    oContainter.className = this.settings.className || 'containter';
    oContainter.id = this.settings.id || 'containter';

    if(this.settings.closeIcon){
        this.closeIcon = '<a href="javascript:;" id="close" class="close">X</a>';
    }else{
        this.closeIcon = '';
    }

    if(this.settings.mask){
        var omask = null;
        omask = document.createElement('div');
        omask.className = 'mask';
        omask.id = 'mask';
        document.body.appendChild(omask);   
    }
    if(this.settings.title!=false){
        this.header = '<h4 class="diaHeader" id="diaHeader"><span class="title">'+this.settings.title+'</span>'+this.closeIcon+'</h4>';
    }else{
        this.header = '';
    }
    

    this.content = '<div class="diaContent" id="diaContent">'+this.settings.content+'</div>';

    var buttons = this.settings.buttons;
    var bntstr = '';

    for (var i = 0; i < buttons.length; i++) {
        bntstr += '<input type="button" class='+buttons[i].className+' value='+buttons[i].text+' />';
    };

    //footer buttons init
    if(this.settings.buttons!=false){
        this.footer = '<div class="diaFooter" id="diaFooter">'+bntstr+'</div>';
    }else{
        this.footer = '';
    }
    

    //template add to containter
    oContainter.innerHTML = this.header+this.content + this.footer;

    //insert template oContainter to body
    document.body.appendChild(oContainter);

    this.bindfn(oContainter,buttons);

    //set containter  css style
    this.setStyle(oContainter,omask);
}

Zdialog.prototype.bindfn = function (oContainter,buttons) {
    var self = this;
    var oheader = oContainter.firstElementChild || oContainter.firstChild ;

    if(oheader.className=="diaHeader"){
        //the closeIcon action
        var oclose = oheader.getElementsByTagName('a')[0];
    }else{
        var oclose = document.getElementById('close');
    }

    if(oclose){
        oclose.onclick = function(){
            setTimeout(function(){
                self.close();
            },self.settings.timeOut);
        };
    }

    //add setting buttons fns
    if(this.footer){
    
        var ofooter = oContainter.lastElementChild || oContainter.lastChild ;
        this.abtns = abtns = ofooter.getElementsByTagName('input');

        if(this.constructor == Zconfirm){
            var self = this;
            abtns[abtns.length-1].onclick = function(){
                if(typeof self.doConfirm == "function" || typeof self.fnCallBack == 'function'){
                    var fnresult;
                    self.doConfirm && self.doConfirm();
                    self.fnCallBack && (fnresult = self.fnCallBack());

                    if(fnresult === false || fnresult === ''){
                        return false;
                    }else{
                        // 关闭弹出层
                        //oldfn();
                        setTimeout(function(){
                            self.close();
                        },self.settings.timeOut);
                    }
                }else{
                    setTimeout(function(){
                        self.close();
                    },self.settings.timeOut);
                }
                


                
            }
            abtns[abtns.length-2].onclick = function(){
                setTimeout(function(){
                    self.close();
                },self.settings.timeOut);
            }
        }

        for (var i = 0; i < abtns.length; i++) {

            if(!buttons[i].fn && this.constructor == Zdialog){
                abtns[i].onclick = function(){
                    setTimeout(function(){
                        self.close();
                    },self.settings.timeOut);
                };
            }

            if(abtns.length>=1){
                
                if(this.constructor == Zalert){
                    var self = this;
                    abtns[abtns.length-1].onclick = function(){
                        if(typeof self.fnCallBack == 'function'){
                            self.fnCallBack && self.fnCallBack();
                        }
                        setTimeout(function(){
                            self.close();
                        },self.settings.timeOut);
                    }
                }else if(this.constructor == Zdialog){
                    abtns[abtns.length-1].onclick = function(){
                        setTimeout(function(){
                            self.close();
                        },self.settings.timeOut);
                    }
                }
            }

            //绑定函数
            if(buttons[i].fn instanceof Function){
                abtns[i].onclick = function(){
                    // 如果按钮上有函数，存下来
                    var oldfn = buttons[i].fn;
                    // 定义新函数
                    var newfn = function(){
                        // 先执行已有的函数
                        var fnresult = oldfn();
                        if(fnresult === false || fnresult === ''){
                            return false;
                        }else{
                            // 关闭弹出层
                            //oldfn();
                            setTimeout(function(){
                                self.close();
                            },self.settings.timeOut);
                        }                                              
                    }
                    // 返回 newfn
                    return newfn;
                }(); 
            }
        }
    }
};

Zdialog.prototype.setStyle = function(oContainter,omask){
    var self = this;
    this.settings.width = this.settings.width.toString();
    if(this.settings.width.indexOf("px")!=-1){
        var dw = 'px';
    }else if(this.settings.width.indexOf("%")!=-1){
        var dw = '%';
    }else if(this.settings.width.indexOf("rem")!=-1){
        var dw = 'rem';     
    }else{
        var dw = 'px'
    }
    oContainter.style.width = parseFloat(this.settings.width) + dw;
    oContainter.style.height = parseFloat(this.settings.height) + dw;
    oContainter.style['min-height'] = parseFloat(this.settings.minHeight) + 'px'; 

    if(this.settings.opacity && omask){
        omask.style.zIndex = 99;
        omask.style.opacity = this.settings.opacity;
    }

    oContainter.style.position = 'fixed';
    if(omask){
        oContainter.style.zIndex = parseInt(omask.style.zIndex) + 1;
    }

    this.setpos(oContainter,omask);

    window.onresize = function(){
        self.setpos(oContainter);
    }
}

//set containter position
Zdialog.prototype.setpos = function(oContainter){
    var self = this;

    if(this.settings.className && this.settings.className.indexOf("allAlert") != -1 ){
        oContainter.style.left = 0;
        oContainter.style.top = 0;
        this.settings.dir = "normal";
    }

    if(this.settings.left || this.settings.top || this.settings.bottom || this.settings.right){
            this.settings.dir = null;
            oContainter.style.left = parseInt(this.settings.left) + 'px';
            oContainter.style.top = parseInt(this.settings.top) + 'px';
            oContainter.style.bottom = parseInt(this.settings.bottom) + 'px';
            oContainter.style.right = parseInt(this.settings.right) + 'px';
    }

    if(this.settings.dir == 'center'){
        /*oContainter.style.left = parseInt((viewWidth() - oContainter.offsetWidth)/2) + 'px';
        oContainter.style.top = parseInt((viewHeight() - oContainter.offsetHeight/2)/2) + 'px';*/
        oContainter.style.left = "50%";
        oContainter.style.top = "50%";
        oContainter.style.marginTop = -oContainter.offsetHeight/2 + 'px';
        oContainter.style.marginLeft = -oContainter.offsetWidth/2 + 'px';
    }
}

Zdialog.prototype.close = Zdialog.close = function(){
    document.body.removeChild(this.containter);
    this.closeMask();
}

Zdialog.prototype.closeMask = Zdialog.closeMask = function(){
    var omask = document.getElementById('mask');
    omask && document.body.removeChild(omask); 
}

function extend(obj1,obj2){
    for(attr in obj2){
        if(obj2 && obj2.hasOwnProperty(attr)){
            obj1[attr] = obj2[attr];
        }
    }
}

function viewWidth(){
    return document.documentElement.clientWidth;
}
function viewHeight(){
    return document.documentElement.clientHeight;
}

var Zalert = function(opt,fnCallBack){

    if(this instanceof Zalert){
        this.settings = {};
        //this.settings.className='';
        this.fnCallBack = fnCallBack;
        extend(this.settings,SETTINGS);
        this.settings.title = '';        
        this.settings.className = 'halfAlert bandMes';
        this.settings.buttons = [{
            text :'确定',
            className : "comfirmBtn"    
        }];
    }else{
        return new Zalert(opt,fnCallBack);
    }
    //this.settings.className ? opt.className = 'containter ' + this.settings.className + ' ' + (opt.className ? opt.className : '') : 'containter';
    if(typeof opt == 'string'){
        this.settings.content = opt;
        this.settings.className ? this.settings.className = 'containter ' + this.settings.className + ' ' : 'containter';  
    }else{
        this.settings.className ? opt.className = 'containter ' + this.settings.className + ' ' + (opt.className ? opt.className : '') : 'containter';
    }
    this.init(opt);
    if(this.settings.dragable === true){
        new Drag('containter').init();
    } 
}

extend(Zalert.prototype,Zdialog.prototype);

Zalert.prototype.init = function (opt){
    extend(this.settings,opt);   
    this.create();
}

var Zconfirm = function(opt,fnCallBack){

    if(this instanceof Zconfirm){
        this.settings = {};

        this.fnCallBack = fnCallBack;
        extend(this.settings,SETTINGS);
        this.settings.className = 'halfAlert zconfirm comfirms';
        this.settings.title = '';
        this.settings.buttons = [{
                text :'取消',
                className : "cancelBtn"
            },{
                text :'确定',
                className : "comfirmBtn"    
            }
        ];
    }else{
        return new Zconfirm(opt,fnCallBack);
    }
    if(typeof opt == 'string'){
        this.settings.content = opt;
        this.settings.className ? this.settings.className = 'containter ' + this.settings.className + ' ' : 'containter';  
    }else{
        this.settings.className ? opt.className = 'containter ' + this.settings.className + ' ' + (opt.className ? opt.className : '') : 'containter';
        this.settings.width = opt.width || "80%";
    }
    
    this.init(opt);
    if(this.settings.dragable === true){
        new Drag('containter').init();
    }
}

extend(Zconfirm.prototype,Zdialog.prototype);

Zconfirm.prototype.init = function (opt){
    extend(this.settings,opt);   
    this.create();
}


function Drag(id){
    this.obj = document.getElementById(id);
    this.disX = 0;
    this.disY = 0;
}
Drag.prototype.init=function(){
    var This = this;
    this.obj.onmousedown = function(ev){
        var ev = ev || event;
        This.fnDown(ev);
        document.onmousemove = function(ev){
            var ev = ev || event;
            This.fnMove(ev);
        };
        document.onmouseup = function(){
            This.fnUp();
        };
        return false;
    };

    return this;
};

Drag.prototype.fnDown=function(ev){
    this.disX = ev.clientX - this.obj.offsetLeft;
    this.disY = ev.clientY - this.obj.offsetTop;
};

Drag.prototype.fnMove = function(ev){
    this.obj.style.left =ev.clientX-this.disX+'px';
    this.obj.style.top =ev.clientY-this.disY+'px';
};

Drag.prototype.fnUp = function(){
    document.onmousemove = null;
    document.onmouseup = null;
};

function ChildDrag(id){
    Drag.call(this,id);
}

extend(ChildDrag.prototype , Drag.prototype);

ChildDrag.prototype.fnMove = function(ev){

    var L = ev.clientX - this.disX;
    var T = ev.clientY - this.disY;
    if (L < 0){
        L = 0;
    } else if(L>document.documentElement.clientWidth-this.obj.offsetWidth){
        L = document.documentElement.clientWidth-this.obj.offsetWidth;
    }

    this.obj.style.left = L + 'px';
    this.obj.style.top = T + 'px';
}




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

