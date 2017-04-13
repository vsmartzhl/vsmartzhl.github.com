var SETTINGS = {
    width : 300,
    minHeight : 100,
    title:'请添加标题',
    content:'请添加文本内容！',
    mask : true,
    dragable:false,
    dir : 'center',
    opacity : 0.1,
    cancelBtn:true
}
var Zdialog = function(opt){

    if(this instanceof Zdialog){
        this.settings = {};
        extend(this.settings,SETTINGS);
        this.settings.closeIcon = true;
        this.settings.className = 'zdialog';
        this.settings.height = '';
        this.settings.buttons = [{
                text : '确定'               
            },{
                text : '取消'               
            }]
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

    if(this.settings.title){
        this.header = '<h4 class="header"><span class="title">'+this.settings.title+'</span>'+this.closeIcon+'</h4>';
    }else{
        this.header = '';
    }
    
    this.content = '<div class="content" id="content">'+this.settings.content+'</div>';

    var buttons = this.settings.buttons;
    var bntstr = '';

    for (var i = 0; i < buttons.length; i++) {
        bntstr += '<input type="button" value='+buttons[i].text+' />';
    };

    //footer buttons init
    this.footer = '<div class="footer" id="footer">'+bntstr+'</div>';

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

    //the closeIcon action
    var oclose = oheader.getElementsByTagName('a')[0];

    if(oclose){
        oclose.onclick = function(){
            self.close();
        };
    }

    //add setting buttons fns
    var ofooter = oContainter.lastElementChild || oContainter.lastChild ;
    this.abtns = abtns = ofooter.getElementsByTagName('input');

    if(this.constructor == Zconfirm){
        var self = this;
        abtns[abtns.length-2].onclick = function(){
            if(typeof self.doConfirm == "function" || typeof self.fnCallBack == 'function'){
                self.doConfirm && self.doConfirm();
                self.fnCallBack && self.fnCallBack();
            }
            self.close();
        }
    }

    for (var i = 0; i < abtns.length; i++) {

        if(!buttons[i].fn && this.constructor == Zdialog){
            abtns[i].onclick = function(){
                self.close();
            };
        }

        if(abtns.length>=1){
            abtns[abtns.length-1].onclick = function(){
                self.close();
            }
        }

        if(buttons[i].fn instanceof Function){
            abtns[i].onclick = function(){

                var oldfn = buttons[i].fn;

                var newfn = function(){
                   oldfn();
                   self.close();
                }
                return newfn;
            }(); 
        }
    }
};

Zdialog.prototype.setStyle = function(oContainter,omask){
    var self = this;
    oContainter.style.width = parseInt(this.settings.width) + 'px';
    oContainter.style.height = parseInt(this.settings.height) + 'px';
    oContainter.style['min-height'] = parseInt(this.settings.minHeight) + 'px'; 

    if(this.settings.opacity && omask){
        omask.style.zIndex = 99;
        omask.style.opacity = this.settings.opacity;
    }

    oContainter.style.position = 'absolute';
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

    if(this.settings.left || this.settings.top || this.settings.bottom || this.settings.right){
            this.settings.dir = null;
            oContainter.style.left = parseInt(this.settings.left) + 'px';
            oContainter.style.top = parseInt(this.settings.top) + 'px';
            oContainter.style.bottom = parseInt(this.settings.bottom) + 'px';
            oContainter.style.right = parseInt(this.settings.right) + 'px';
    }

    if(this.settings.dir == 'center'){
        oContainter.style.left = parseInt((viewWidth() - oContainter.offsetWidth)/2) + 'px';
        oContainter.style.top = parseInt((viewHeight() - oContainter.offsetHeight)/2) + 'px';
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

var Zalert = function(opt){

    if(this instanceof Zalert){
        this.settings = {};
        //this.settings.className='';
        extend(this.settings,SETTINGS);
        this.settings.title = '';
        
        
        this.settings.className = 'zalert';
        this.settings.buttons = [{
            text : '确定'               
        }];
    }else{
        return new Zalert(opt);
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
        this.settings.className = 'zconfirm';
        this.settings.buttons = [
            { text : '确定'},
            { text : '取消'}
        ];
    }else{
        return new Zconfirm(opt,fnCallBack);
    }
    this.settings.className ? opt.className = 'containter ' + this.settings.className + ' ' + (opt.className ? opt.className : '') : 'containter';
    
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

