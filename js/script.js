var body=document.documentElement?document.documentElement:document.body;
window.onload=function(){
    waveFx();
    imgPost();
    charToImg();
    infinityLoad();
    tapToComment();
    respondHeadToggel();
    extraInput();
    resloveAvatar();
    instantAvatar();
    ajaxComment();
    pageAjax();
    historyHandle();
    lightBox();
    switchColor();
    authorNewTab();
    reverseChildren();
    //滚动时改变头部样式
    var actionBar=getById("action-bar"),
    header=getById("header"),
    title=getById("title"),
    titleTop=title.offsetTop,
    prevTop=0;
    addEvent(window,"scroll",function(e){
        e=getEvent(e);
        var top=document.documentElement.scrollTop||document.body.scrollTop;
        if(top>header.offsetHeight-actionBar.offsetHeight){
            addClass(actionBar,"opaque");
            addClass(title,"scroll");
        }else{
            removeClass(actionBar,"opaque");
            removeClass(title,"scroll");
        }
        if(top>header.offsetHeight*2&&top>prevTop){
            addClass(actionBar,"hide");
            addClass(title,"hide");
        }else{
            removeClass(actionBar,"hide");
            removeClass(title,"hide");
        }
        prevTop=top;
        if(top>=titleTop){
            addClass(title,"scroll");
        }else{
            removeClass(title,"scroll");
        }
    });
    //返回顶部
    addEvent(header,"click",function(e){
        e=getEvent(e);
        body=document.documentElement.scrollTop?document.documentElement:document.body;
        startMove(body,{"scrollTop":0});
    });
    //头部背景
    var bgArr=["//storage.live.com/items/A30B6ED958360E77!446",
    "//storage.live.com/items/A30B6ED958360E77!447",
    "//storage.live.com/items/A30B6ED958360E77!448",
    "//storage.live.com/items/A30B6ED958360E77!449",
    "//storage.live.com/items/A30B6ED958360E77!450",
    "//storage.live.com/items/A30B6ED958360E77!451",
    "//storage.live.com/items/A30B6ED958360E77!452",
    "//storage.live.com/items/A30B6ED958360E77!453",
    "//storage.live.com/items/A30B6ED958360E77!454"];
    // if(body.clientWidth>456){
        header.style.backgroundImage="url("+bgArr[Math.floor(Math.random()*bgArr.length)]+")";
    // }
    //搜索框展开与收缩
    var headerRight=getByClass("header-right")[0],
    headerLeft=getByClass("header-left")[0],
    searchBtn=getById("search-btn"),
    searchCloseBtn=getById("search-close-btn"),
    searchInput=getById("search-input");
    searchBtn.isEnable=false;
    addEvent(searchBtn,"click",function(e){
        e=getEvent(e);
        wWidth=document.documentElement.clientWidth||document.body.clientWidth;
        stopPropagetion(e);
        preventDefault(e);
        if(hasClass(headerRight,"fold")){
            preventDefault(e);
            removeClass(headerRight,"fold");
            searchInput.focus();
        }
        if(wWidth<456){
            headerLeft.style.display="none";
            title.style.display="none";
        }
    });
    addEvent(searchCloseBtn,"click",function(e){
        e=getEvent(e);
        stopPropagetion(e);
        preventDefault(e);
        addClass(headerRight,"fold");
        headerLeft.style.display=null;
        title.style.display=null;
        searchBtn.isEnable=false;
    });
    addEvent(searchInput,"click",function(e){
        e=getEvent(e);
        stopPropagetion(e);
    });
    //Ajax搜索
    var mainContent=getById("main-content"),
    ajaxSearch=function(e){
        if(searchBtn.isEnable){
            if(searchInput.value==""){
                var floatNotify=getById("float-notify");
                floatNotify.innerHTML="请输入搜索内容";
                floatNotify.style.marginLeft=-(floatNotify.offsetWidth/2)+"px";
                addClass(floatNotify,"display");
                setTimeout(function(){
                    removeClass(floatNotify,"display");
                },3000);
            }else{
                loaderDisplay("on");
                var _xhr=new XMLHttpRequest();
                _xhr.open("POST",getById("search").action);
                var data="s="+searchInput.value;
                _xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                _xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
                _xhr.send(data);
                _xhr.onreadystatechange=function(){
                    if(_xhr.readyState==4&&_xhr.status==200){
                        var tmpEle=document.createElement("div"),
                        href=window.location.origin+"/search/"+searchInput.value+"/";
                        tmpEle.innerHTML=_xhr.responseText;
                        document.title=getByClass("archive-title",tmpEle)[0].innerHTML;
                        mainContent.innerHTML=tmpEle.innerHTML;
                        tmpEle=null;
                        history.pushState({title:document.title,url:href,content:mainContent.innerHTML},document.title,href);
                        ajaxFix();
                    }
                }
                loaderDisplay("off");
            }
        }
        searchBtn.isEnable=true;
    };
    addEvent(searchBtn,"click",ajaxSearch);
    addEvent(searchInput,"keyup",function(e){
        e=getEvent(e);
        if(e.keyCoode==13){
            searchBtn.click();
        }/*else if(e.keyCode==27){
            searchCloseBtn.click();
        }*/
    });
    //展开关闭导航及浮层
    var hamburgerButton=getByClass("hamburger-button")[0],
    sideNav=getByClass("side-nav")[0],
    floatLayer=getById("float-layer"),
    closeLayer=function(){
        removeClass(sideNav,"display");
        removeClass(hamburgerButton,"active");
        removeClass(floatLayer,"display");
        document.body.style.overflow=null;
        setTimeout(function(){
            floatLayer.style.display=null;
            floatLayer.style.zIndex=null;
            floatLayer.onclick=null;
        },300);
    };
    addEvent(hamburgerButton,"click",function(e){
        e=getEvent(e);
        stopPropagetion(e);
        document.body.style.overflow="hidden";
        addClass(hamburgerButton,"active");
        addClass(sideNav,"display");
        floatLayer.style.display="block";
        floatLayer.style.zIndex=getStyle(sideNav,"z-index")-1;
        addClass(floatLayer,"display");
        floatLayer.onclick=closeLayer;
    });
    var navA=document.getElementsByTagName("nav")[0].getElementsByTagName("a");
    for(var i=0;i<navA.length;i++){
        addEvent(navA[i],"click",function(){
            for(var j=0;j<navA.length;j++){
                removeClass(navA[j],"current");
            }
            addClass(this,"current");  
            closeLayer();          
        });
    }
}
//波纹效果
function waveFx(){
    var wavers=getByClass("waver");
    var waveHandle=function(e){
        var that=this;
        e=getEvent(e);
        e.target=getTarget(e);
        if(hasClass(that,"waver")){
            var waveSelf=document.createElement("div"),
            waveContainer=document.createElement("div");
            waveSelf.className="wave-self";
            waveContainer.className="wave-container";
            waveContainer.appendChild(waveSelf);
            that.appendChild(waveContainer);
            if(getStyle(that,"position")=="static"){
                that.style.position="relative";
            }
            that.style.overflow="hidden";
            var mut=Math.ceil(bigger(that.offsetWidth,that.offsetHeight)/20)*2,
            recUp=that,
            offset={"target":"",
            "position":"",
            "top":0,
            "left":0};
            while(recUp&&recUp!=document){
                if(getStyle(recUp,"position")=="fixed"&&recUp!=that){
                    offset.target="parent";
                    offset.position="fixed";
                    break;
                }else if(getStyle(recUp,"position")=="fixed"&&recUp==that){
                    offset.target="self";
                    offset.position="fixed";
                    break;
                }else if(getStyle(recUp,"position")=="absolute"&&recUp!=that){
                    offset.top+=recUp.offsetTop;
                    offset.left+=recUp.offsetLeft;
                }
                recUp=recUp.parentNode;
            }
            var pTop,pLeft;
            if(offset.target=="parent"&&offset.position=="fixed"){
                pTop=e.clientY-recUp.offsetTop-that.offsetTop-offset.top;
                pLeft=e.clientX-recUp.offsetLeft-that.offsetLeft-offset.left;
            }else if(offset.target=="self"&&offset.position=="fixed"){
                pTop=e.clientY-that.offsetTop;
                pLeft=e.clientX-that.offsetLeft;                    
            }else{
                if(document.documentElement.scrollTop){
                    body=document.documentElement;
                }else if(document.body.scrollTop){
                    body=document.body;
                }
                pTop=e.clientY-(that.offsetTop-body.scrollTop);
                pLeft=e.clientX-(that.offsetLeft-body.scrollLeft);
            }
            waveSelf.setAttribute("style","top:"+pTop+"px;left:"+pLeft+"px;-webkit-transform:scale("+mut+");-moz-transform: scale("+mut+");-ms-transform:scale("+mut+");-o-transform:scale("+mut+");transform:scale("+mut+");opacity:1;-webkit-transition-duration:400ms;-moz-transition-duration:400ms;-o-transition-duration:400ms;transition-duration:400ms;-webkit-transition-timing-function:cubic-bezier(0.250,0.460,0.450,0.940);-moz-transition-timing-function:cubic-bezier(0.250,0.460,0.450,0.940);-o-transition-timing-function:cubic-bezier(0.250,0.460,0.450,0.940);transition-timing-function:cubic-bezier(0.250,0.460,0.450,0.940);");
            var delayOut=function(e){
                e=getEvent(e);
                e.target=getTarget(e);
                var styleTimer=setTimeout(function(){
                    clearTimeout(styleTimer);
                    waveSelf.setAttribute("style","top:"+pTop+"px;left:"+pLeft+"px;opacity:0;-webkit-transition-duration:400ms;-moz-transition-duration:400ms;-o-transition-duration:400ms;transition-duration:400ms;-webkit-transform:scale("+mut+");-moz-transform:scale("+mut+");-ms-transform:scale("+mut+");-o-transform:scale("+mut+");transform:scale("+mut+");");
                    var delTimer=setTimeout(function(){
                        clearTimeout(delTimer);
                        if(waveContainer){
                            waveContainer=waveContainer.parentNode.removeChild(waveContainer);
                            waveContainer=null;
                            that.style.overflow=null;
                            that.style.position=null;
                        }
                    },400);
                },400);
            }
            addEvent(that,"mouseout",delayOut);
            addEvent(that,"mouseup",delayOut);
        }
    }
    for(var i=0;i<wavers.length;i++){
        //removeEvent(wavers[i],"mousedown",waveHandle);
        if(!wavers[i].effected){
            addEvent(wavers[i],"mousedown",waveHandle);
            wavers[i].effected=true;
        }
    }

}
//含有图片的文章项样式改变
function imgPost(){
    var postItems=getByClass("post-item");
    for(var i=0;i<postItems.length;i++){
        var postContent=getByClass("post-content",postItems[i])[0],
        more=getByClass("more",postContent)[0],
        hasImg=postContent.getElementsByTagName("img");
        if(more){
            more=more.parentNode.removeChild(more);
            more=null;
        }
        if(hasImg.length>0){
            addClass(postItems[i],"has-img");
            var cover=document.createElement("img");
            cover.src=hasImg[0].src;
            cover.className="cover";
            for(var j=0;j<hasImg.length;j++){
                hasImg[j]=hasImg[j].parentNode.removeChild(hasImg[j]);
                hasImg[j]=null;
            }
            var titleLink=postItems[i].getElementsByTagName("h2")[0].getElementsByTagName("a")[0];
            titleLink.innerHTML="<span>"+titleLink.innerHTML+"</span>";
            titleLink.insertBefore(cover,titleLink.getElementsByTagName("span")[0]);
        }
        //隐藏被抽取图片的链接
        var links=postContent.getElementsByTagName("a");
        for(var k=0;k<links.length;k++){
            if(links[k].innerHTML==""){
                var parent=links[k].parentNode,
                next=getNextNode(links[k]);
                if(next&&next.nodeName=="BR"){
                    var br=parent.removeChild(getNextNode(links[k]));
                    br=null;
                };
                links[k]=parent.removeChild(links[k]);
                links[k]=null;
                if(parent.nodeName=="P"&&parent.innerHTML==""){
                    parent=parent.parentNode.removeChild(parent);
                    parent=null;
                }
            }
        }
    }
}
//点击评论按钮/回复链接，展开评论框以及浮层
function tapToComment(){
    var openComment=getById("open-comment"),
    closeReply=getById("close-reply"),
    respond=getByClass("respond")[0],
    floatLayer=getById("float-layer"),
    textArea=getById("textarea"),
    popup=function(){
        body.style.overflow="hidden";
        addClass(openComment,"hide");
        removeClass(respond,"hide");
        textArea.focus();
        floatLayer.style.display="block";
        floatLayer.style.zIndex=getStyle(respond,"z-index")-1;
        addClass(floatLayer,"display");
        floatLayer.onclick=hideComment;
        closeReply.onclick=floatLayer.onclick;
    };
    if(openComment){
        addEvent(openComment,"click",function(e){
            e=getEvent(e);
            popup();
        });
    }
    var comments=getById("comments");
    if(comments){
        addEvent(comments,"click",function(e){
            e=getEvent(e);
            e.target=getTarget(e);
            parent=e.target.parentNode;
            if(parent.nodeName=="SPAN"&&parent.className=="comment-reply"){
                //preventDefault(e);
                popup();
            }
        });
    }
}
function hideComment(){
    var openComment=getById("open-comment"),
    closeReply=getById("close-reply"),
    respond=getByClass("respond")[0],
    floatLayer=getById("float-layer");
    addClass(respond,"hide");
    removeClass(openComment,"hide");
    removeClass(floatLayer,"display");
    body.style.overflow=null;
    setTimeout(function(){
        floatLayer.style.display=null;
        floatLayer.style.zIndex=null;
        floatLayer.onclick=null;
        this.onclick=null;
    },300);
}
//评论框头部伸缩切换
function respondHeadToggel(){
    var headToggle=getById("head-toggle"),
    respondHead=getById("respond-head"),
    author=getById("author"),
    recoededId=getById("recorded-id"),
    mail=getById("mail"),
    textareaContainer=getByClass("textarea-container")[0];
    if(respondHead&&author.value!=""&&mail.value!=""){
        addClass(respondHead,"fold");
        addClass(textareaContainer,"unfold");
        recoededId.innerHTML=author.value;
    }
    if(headToggle){
        addEvent(headToggle,"click",function(e){
            e=getEvent(e);
            if(hasClass(respondHead,"fold")){
                removeClass(respondHead,"fold");
                removeClass(textareaContainer,"unfold");
            }else{
                addClass(respondHead,"fold");
                addClass(textareaContainer,"unfold");
                recoededId.innerHTML=author.value;
            }
        });
    }
}
//表情与格式
function extraInput(){
    var formatEmoji=getById("format-emoji"),
    textarea=getById("textarea"),
    facesPanel=getById("face-panel"),
    facePanelSwitch=getById("face-panel-switch");
    if(formatEmoji){
        addEvent(formatEmoji,"click",function(e){
            e=getEvent(e);
            e.target=getTarget(e);
            preventDefault(e);
            switch(e.target.dataset.format){
                case "bold":
                textarea.value+="<b></b>";
                break;
                case "italic":
                textarea.value+="<i></i>";
                break;
                case "strike":
                textarea.value+="<del></del>";
                break;
                case "faces":
                if(hasClass(facesPanel,"hide")){
                    addClass(facePanelSwitch,"focus");
                    removeClass(facesPanel,"hide");
                }else{
                    addClass(facesPanel,"hide");
                    removeClass(facePanelSwitch,"focus");
                }
                break;
            }
        });
        addEvent(facesPanel,"click",function(e){
            e=getEvent(e);
            e.target=getTarget(e);
            if(e.target.nodeName=="BUTTON"){
                preventDefault(e);
                //var charConventer=document.createElement("span");
                //charConventer.innerHTML="&#x"+e.target.dataset.code+";";
                //textarea.value+=charConventer.innerHTML;
                textarea.value+="&#x"+e.target.dataset.code+";";
                charConventer=null;
                addClass(facesPanel,"hide");
                removeClass(facePanelSwitch,"focus");
                textarea.style.height=null;
            }
        });
    }
}
//emoji字符转换
function charToImg(){
    var allEles=getByClass("main")[0].getElementsByTagName("*"),
    monoEles=[];
    for(var i=0;i<allEles.length;i++){
        if(allEles[i].nodeType==1&&allEles[i].childNodes.length==1&&allEles[i].childNodes[0].nodeType==3){
            monoEles.push(allEles[i]);
        }
    }
    var speChars=["😉", "😊", "😌", "😍", "😎", "😏", "😚", "😛", "😜", "😝", "😞", "😟", "😪", "😫", "😬", "😭", "😮", "😯", "🙋", "🙌", "🙍", "🙎", "🙏", "😀", "😁", "😂", "😃", "😄", "😅", "😆", "😇", "😈", "😋", "😐", "😑", "😒", "😓", "😔", "😕", "😖", "😗", "😘", "😙", "😠", "😡", "😢", "😣", "😤", "😥", "😦", "😧", "😨", "😩", "😰", "😱", "😲", "😳", "😴", "😵", "😶", "😷", "🙅", "🙆", "🙇"],
    faceClasses=["u1f609", "u1f60a", "u1f60c", "u1f60d", "u1f60e", "u1f60f", "u1f61a", "u1f61b", "u1f61c", "u1f61d", "u1f61e", "u1f61f", "u1f62a", "u1f62b", "u1f62c", "u1f62d", "u1f62e", "u1f62f", "u1f64b", "u1f64c", "u1f64d", "u1f64e", "u1f64f", "u1f600", "u1f601", "u1f602", "u1f603", "u1f604", "u1f605", "u1f606", "u1f607", "u1f608", "u1f60b", "u1f610", "u1f611", "u1f612", "u1f613", "u1f614", "u1f615", "u1f616", "u1f617", "u1f618", "u1f619", "u1f620", "u1f621", "u1f622", "u1f623", "u1f624", "u1f625", "u1f626", "u1f627", "u1f628", "u1f629", "u1f630", "u1f631", "u1f632", "u1f633", "u1f634", "u1f635", "u1f636", "u1f637", "u1f645", "u1f646", "u1f647"];
    for(var i=0;i<monoEles.length;i++){
        for(var j=0;j<speChars.length;j++){
            if(monoEles[i].innerHTML.indexOf(speChars[j])>-1){
                monoEles[i].innerHTML=monoEles[i].innerHTML.replace(speChars[j],"<span class='spechar-alt "+faceClasses[j]+"' style='zoom:"+parseInt(getStyle(monoEles[i],"font-size"))/24+";'>"+speChars[j]+"</span>");
            }
        }
    }

}
//头像URL随邮箱动态改变
function instantAvatar(){
    var mail=getById("mail"),
    instAva=getById("inst-ava");
    if(mail){
        addEvent(mail,"change",function(e){
            e=getEvent(e);
            resloveAvatar();
        });
    }
}
function resloveAvatar(){
    var mail=getById("mail"),
    instAva=getById("inst-ava");
    if(mail){
        var mail=getById("mail"),
        instAva=getById("inst-ava");
        instAva.src="//www.gravatar.com/avatar/"+md5(mail.value)+"?s=100&r=G&d=";
    }
}
//页面主色切换
function switchColor(){
    var path=window.location.pathname,
    themeColor=getById("theme-color"),
    colors=["color-red","color-pink","color-purple","color-deep-purple","color-indigo","color-blue","color-light-blue","color-cyan","color-teal","color-green","color-light-green","color-lime","color-yello","color-amber","color-orange","color-deep-orange","color-brown","color-grey","color-blue-grey"],
    hasStr=function(obj,str){
        if(obj.indexOf(str)>-1){
            return true;
        }else{
            return false;
        }
    };
    for(var i=0;i<colors.length;i++){
        removeClass(document.body,colors[i]);
    }
    if(path=="/"){
        addClass(document.body,"color-cyan");
        themeColor.content="#00bcd4";
    }else if(hasStr(path,"/20")){
        addClass(document.body,"color-red");
        themeColor.content="#f44336";
    }else if(hasStr(path,"/category/")){
        addClass(document.body,"color-indigo");
        themeColor.content="#3f51b5";
    }else if(hasStr(path,"/author/")){
        addClass(document.body,"color-teal");
        themeColor.content="#009688";
    }else if(hasStr(path,"/search/")){
        addClass(document.body,"color-blue-grey");
        themeColor.content="#607d8b";
    }else if(hasStr(path,"/tag/")){
        addClass(document.body,"color-blue");
        themeColor.content="#2196f3";
    }else{
        addClass(document.body,"color-purple");
        themeColor.content="#9c27b0";
    }
}
//浮层处理
function floatLayerDisplay(obj,cls,rm){
    floatLayer=getById("float-layer");
    if(rm){
    removeClass(obj,cls);
    }else{
    addClass(obj,cls);
    }//rm无值默认添加class
    floatLayer.style.display="block";
    floatLayer.style.zIndex=getStyle(obj,"z-index")-1;
    addClass(floatLayer,"display");
    floatLayer.onclick=function(){
        if(rm){
            addClass(obj,cls);
        }else{
            removeClass(obj,cls);
        }
        removeClass(floatLayer,"display");
        setTimeout(function(){
            floatLayer.style.display=null;
            floatLayer.style.zIndex=null;
            floatLayer.onclick=null;
        },300);
    }
}
//菊花开关
function loaderDisplay(statu){
    var loader=getByClass("loader")[0];
    switch(statu){
        case "on":
        addClass(loader,"display");
        break;
        case "off":
        setTimeout(function(){removeClass(loader,"display")},300);
        break;
    }
}
//Ajax无限文章列表/归档/评论列表
function infinityLoad(){
    //文章与归档列表
    var postList=getByClass("post-list")[0];
    if(postList){
        postList.ajaxEnable=true;
        postList.currentPage=1,
        postList.page="";
        addEvent(window,"scroll",function(e){
            e=getEvent(e);
            var top=document.documentElement.scrollTop||document.body.scrollTop,
            pageHeight=document.documentElement.offsetHeight||document.body.offsetHeight,
            windowHeight=document.documentElement.clientHeight||document.body.clientHeight,
            postList=getByClass("post-list")[0];
            if(postList&&top>(pageHeight-windowHeight-100)&&postList.ajaxEnable){
                loaderDisplay("on");
                postList.ajaxEnable=false;
                postList.currentPage++;
                if(window.location.pathname.indexOf("/author/")>-1||window.location.pathname.indexOf("/category/")>-1||window.location.pathname.indexOf("/search/")>-1||window.location.pathname.indexOf("/tag/")>-1){
                    postList.page="";
                }else{
                    postList.page="page/";
                }
                ajaxGet(window.location.href+postList.page+postList.currentPage+"/",function(data){
                    if(data.indexOf("article")>-1){
                        var tmpEle=document.createElement("div");
                        tmpEle.innerHTML=data;
                        tmpEles=getByClass("post-list",tmpEle)[0].childNodes;
                        for(var i=0;i<tmpEles.length;i++){
                            if(tmpEles[i].nodeType==1){
                                postList.appendChild(tmpEles[i]);
                            }
                        }
                        postList.ajaxEnable=true;
                        tmpEle=null;
                        tmpEles=null;
                        ajaxFix("noChange");
                    }else{
                        var ajaxOver=document.createElement("p");
                        ajaxOver.className="ajax-over";
                        ajaxOver.innerHTML="评论加载完毕";
                        postList.appendChild(ajaxOver);
                    }
                });
                loaderDisplay("off");
            }        
        });
    }
    //评论列表
    var commentList=getByClass("comment-list")[0];
    if(commentList){
        commentList.ajaxEnable=true;
        var commentCurrent=getByClass("current",getByClass("page-navigator")[0])[0];
        if(commentCurrent&&commentCurrent.getElementsByTagName("a")[0]&&parseInt(commentCurrent.getElementsByTagName("a")[0].innerHTML)!=NaN){
            commentList.currentPage=parseInt(commentCurrent.getElementsByTagName("a")[0].innerHTML);
        }else{
            commentList.currentPage=1;
        }
        addEvent(window,"scroll",function(e){
            e=getEvent(e);
            var top=document.documentElement.scrollTop||document.body.scrollTop,
            windowHeight=document.documentElement.clientHeight||document.body.clientHeight,
            commentList=getByClass("comment-list")[0];
            if(commentList&&top>(commentList.offsetTop+commentList.offsetHeight-windowHeight-100)&&commentList.ajaxEnable){
                loaderDisplay("on");
                commentList.ajaxEnable=false;
                commentList.currentPage++;
                var locate=window.location.href,
                urlArgIndex=window.location.href.indexOf(".html/comment-page-");
                if(urlArgIndex>-1){
                    locate=window.location.href.substring(0,urlArgIndex+5);
                }
                ajaxGet(locate+"/comment-page-"+commentList.currentPage,function(data){
                    console.log(commentList.currentPage);
                    var tmpEle=document.createElement("div"),tmpEles;
                    tmpEle.innerHTML=data;
                    var commentListOnData=getByClass("comment-list",tmpEle)[0];
                    if(commentListOnData){
                        var tmpEles=getByClass("comment-list",tmpEle)[0].childNodes;
                        for(var i=0;i<tmpEles.length;i++){
                            if(tmpEles[i].nodeType==1){
                                commentList.appendChild(tmpEles[i]);
                            }
                        }
                        commentList.ajaxEnable=true;
                        tmpEle=null;
                        tmpEles=null;
                        ajaxFix("noChange");
                    }else{
                        var ajaxOver=document.createElement("p");
                        ajaxOver.className="ajax-over";
                        ajaxOver.innerHTML="评论加载完毕";
                        commentList.appendChild(ajaxOver);
                    }
                });
                loaderDisplay("off");
            }        
        });
    }
}
//Ajax加载页面
function pageAjax(){
    var mainContent=getById("main-content");
    var allLinks=document.getElementsByTagName("a");
    for(var i=0;i<allLinks.length;i++){
        var link=allLinks[i];
        if(link.host==window.location.host&&!link.ajaxed&&link.parentNode.className!="comment-reply"&&!link.dataset.noajax){
            addEvent(allLinks[i],"click",function(e){
                e=getEvent(e);
                stopPropagetion(e);
                preventDefault(e);
                var that=this;
                loaderDisplay("on");
                ajaxGet(that.href,function(data){
                    mainContent.innerHTML=data;
                    var postCommentsContainer=getByClass("post-comments-container")[0],
                    postTitle=postCommentsContainer?postCommentsContainer.getElementsByTagName("h2")[0]:null,
                    archiveTitle=getByClass("archive-title",mainContent)[0],
                    titleName=getById("title").getElementsByTagName("a")[0].innerHTML;
                    if(postTitle){
                        document.title=postTitle.innerHTML+" - "+titleName;
                    }else if(archiveTitle){
                        document.title=archiveTitle.innerHTML+" - "+titleName;
                    }else{
                        document.title=titleName;
                    }
                    history.pushState({title:document.title,url:that.href,content:mainContent.innerHTML},document.title,that.href);
                    ajaxFix();
                });
                body=document.documentElement.scrollTop?document.documentElement:document.body;
                startMove(body,{"scrollTop":0});
                loaderDisplay("off");
            });
            allLinks[i].ajaxed=true;
        }
    }
}
//Ajax评论
function ajaxComment(){
    var submitBtn=getById("submit"),
    openComment=getById("open-comment"),
    comments=getById("comments"),
    textArea=getById("textarea"),
    parent=null;
    var ifExist=function(id){
        var ele=getById(id);
        if(ele){
            return encodeURI(ele.value);
        }else{
            return "";
        }
    }
    if(submitBtn){
        if(!comments.ajaxCommented){
            comments.ajaxCommented=true;
            addEvent(comments,"click",function(e){
                e=getEvent(e);
                e.target=getTarget(e);
                if(e.target.nodeName=="A"&&e.target.parentNode.className=="comment-reply"){
                    preventDefault(e);
                    parent=e.target.dataset.theid.substring(8);
                }
            });
        }
        if(!openComment.ajaxCommented){
            openComment.ajaxCommented=true;
            addEvent(openComment,"click",function(){parent="";});
        }
        if(!submitBtn.ajaxCommented){
            submitBtn.ajaxCommented=true;
            addEvent(submitBtn,"click",function(e){
                e=getEvent(e);
                preventDefault(e);
                loaderDisplay("on");
                var _xhr=new XMLHttpRequest();
                _xhr.open("POST",getById("comment-form").action);
                var data="author="+ifExist("author")+"&mail="+ifExist("mail")+"&url="+ifExist("url")+"&text="+ifExist("textarea")+"&parent="+parent;
                _xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                _xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
                _xhr.send(data);
                _xhr.onreadystatechange=function(){
                    if(_xhr.readyState==4&&_xhr.status==200){
                        var tmpEle=document.createElement("div");
                        tmpEle.innerHTML=_xhr.responseText;
                        tmpTitle=tmpEle.getElementsByTagName("title")[0]?tmpEle.getElementsByTagName("title")[0].innerHTML:null;
                        if(tmpTitle=="Error"){
                            var floatNotify=getById("float-notify"),
                            errorMessage=getByClass("container",tmpEle)[0];
                            floatNotify.innerHTML=errorMessage.innerHTML;
                            floatNotify.style.marginLeft=-(floatNotify.offsetWidth/2)+"px";
                            addClass(floatNotify,"display");
                            setTimeout(function(){
                                removeClass(floatNotify,"display");
                            },3000);
                        }else{
                            textArea.value=null;
                            hideComment();
                            var mainContent=getById("main-content");
                            mainContent.innerHTML=_xhr.responseText;
                            ajaxFix();
                        }
                        tmpEle=null;
                    }
                }
                loaderDisplay("off");
            });
            addEvent(textArea,"keydown",function(e){
                e=getEvent(e);
                if(e.keyCode==13&&e.ctrlKey){
                    preventDefault(e);
                    submitBtn.click();
                }
            });
        }
    }
}
//历史记录处理
function historyHandle(){
    var mainContent=getById("main-content");
    history.pushState({title:document.title,url:window.location.href,content:mainContent.innerHTML},document.title,window.location.href);
    addEvent(window,"popstate",function(e){
        e=getEvent(e);
        if(e.state){
            mainContent.innerHTML=e.state.content;
            document.title=e.state.title;
            ajaxFix();
        }
    });
}
//Ajax后的重处理
function ajaxFix(changeUrl){
    waveFx();
    imgPost();
    charToImg();
    if(changeUrl!="noChange"){
        infinityLoad();
    }
    tapToComment();
    respondHeadToggel();
    extraInput();
    resloveAvatar();
    instantAvatar();
    ajaxComment();
    pageAjax();
    lightBox();
    switchColor();
    authorNewTab();
    reverseChildren();
}
//灯箱
function lightBox(){
    var postCommentsContainer=getByClass("post-comments-container")[0],
    box=getById("light-box"),
    zoomImg=getById("zoom-img"),
    loader=getByClass("loader")[0],
    prev=getByClass("prev")[0],
    next=getByClass("next")[0],
    imgLinks=[],
    index=0,
    imgChange=function(){
        if(index==0){
            prev.style.display="none";
        }else if(index==imgLinks.length-1){
            next.style.display="none";
        }else{
            prev.style.display=null;
            next.style.display=null;
        }
    },
    isImgLink=function(obj){
        if(obj.href.indexOf(".jpg")>-1||obj.href.indexOf(".png")>-1||obj.href.indexOf(".gif")>-1){
            return true;
        }else{
            return false;
        }
    };
    if(postCommentsContainer){
        var links=postCommentsContainer.getElementsByTagName("a");
        for(var i=0;i<links.length;i++){
            if(isImgLink(links[i])){
                imgLinks.push(links[i]);
            }
        }
    }
    if(postCommentsContainer&&!postCommentsContainer.lightBoxed){
        if(imgLinks.length>0){
            addEvent(postCommentsContainer,"click",function(e){
                e=getEvent(e);
                e.target=getTarget(e);
                var sameACt=function(){
                    preventDefault(e);
                    imgChange();
                    document.body.style.overflow="hidden";
                    box.style.display="block";
                    setTimeout(function(){addClass(box,"display");},1);
                    addClass(loader,"display");
                    zoomImg.onload=function(){
                        zoomImg.style.width=null;
                        zoomImg.style.height=null;
                        zoomImg.style.maxWidth=null;
                        zoomImg.style.maxHeight=null;
                        zoomImg.style.marginLeft=null;
                        zoomImg.style.marginTop=null;
                        zoomImg.style.marginLeft=-(zoomImg.offsetWidth/2)+"px";
                        zoomImg.style.marginTop=-(zoomImg.offsetHeight/2)+"px";
                        removeClass(loader,"display");
                        removeClass(zoomImg,"hide");
                    }
                }
                if(e.target.nodeName=="IMG"&&e.target.parentNode.nodeName=="A"&&isImgLink(e.target.parentNode)){
                    addClass(zoomImg,"hide");
                    zoomImg.src=e.target.parentNode.href;
                    index=imgLinks.indexOf(e.target.parentNode);
                    sameACt();
                }else if(e.target.nodeName=="A"&&isImgLink(e.target)){
                    addClass(zoomImg,"hide");
                    zoomImg.src=e.target.href;
                    index=imgLinks.indexOf(e.target);
                    sameACt();
                }
            });
        }
        box.onclick=function(e){
            e=getEvent(e);
            e.target=getTarget(e);
            if(hasClass(e.target,"close")||hasClass(e.target.parentNode,"close")){
                removeClass(box,"display");
                setTimeout(function(){box.style.display=null;},300);
                document.body.style.overflow=null;
            }else if(hasClass(e.target,"prev")||hasClass(e.target.parentNode,"prev")){
                addClass(zoomImg,"hide");
                index--;
                zoomImg.src=imgLinks[index].href;
                imgChange();
                addClass(loader,"display");
            }else if(hasClass(e.target,"next")||hasClass(e.target.parentNode,"next")){
                addClass(zoomImg,"hide");
                index++;
                zoomImg.src=imgLinks[index].href;
                imgChange();
                addClass(loader,"display");
            }
        }
        zoomImg.onmousewheel=function(e){
            e=getEvent(e);
            preventDefault(e);
            if(e.wheelDelta>0){
                zoomImg.style.width=zoomImg.offsetWidth*1.25+"px";
            }else{
                zoomImg.style.width=zoomImg.offsetWidth/1.25+"px";
            }
            zoomImg.style.marginLeft=-(zoomImg.offsetWidth/2)+"px";
            zoomImg.style.marginTop=-(zoomImg.offsetHeight/2)+"px";
            zoomImg.style.maxWidth="initial";
            zoomImg.style.maxHeight="initial";
        }
        postCommentsContainer.lightBoxed=true;
    }
}
//评论作者链接新标签打开
function authorNewTab(){
    var authorId=getByClass("author-id");
    if(authorId.length>0){
        for(var i=0;i<authorId.length;i++){
            var authorLink=authorId[i].getElementsByTagName("a")[0];
            authorLink?authorLink.setAttribute("target","_blank"):null;
        }
    }
}
//子评论反序
function reverseChildren(){
    var commentChildrens=getByClass("comment-children");
    for(var i=0;i<commentChildrens.length;i++){
        if(!commentChildrens[i].reversed){
            var commentList=getByClass("comment-list",commentChildrens[i])[0],
            commentChilds=getByClass("comment-child",commentList);
            commentChilds.reverse();
            for(var j=0;j<commentChilds.length;j++){
                commentList.appendChild(commentChilds[j]);
            }
            commentChildrens[i].reversed=true;
        }
    }
}
//比较大小
function bigger(a,b){
    if(a>b){
        return a;
    }else{
        return b;
    }
}
//传递的e参数获取，兼容浏览器代码。
function getEvent(e){
    var event = e || window.evnet;
    return event;
}
//阻止冒泡事件，兼容浏览器。
function stopPropagetion(e){
    var event = getEvent(e);
    if ( event.stopPropagetion){
        event.stopPropagetion();
    }else{
        event.cancelBubble = true;
    }
}
//dom绑定事件和删除事件绑定，兼容浏览器。
function addEvent(element,type,handler){
    if(element.addEventListener){
        element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
        element.attachEvent('on'+type,handler);
    }else{
        element['on'+type]=handler;
    }
}
function removeEvent(element,type,handler){
    if(element.removeEventListener){
        element.removeEventListener(type,handler,false);
    }else if(element.detachEvent){
        element.detachEvent('on'+type,handler);
    }else{
        element['on'+type]=null;
    }
}
//取消事件默认动作，兼容浏览器。
function preventDefault(event){
    if(event.preventDefault){
        event.preventDefault();
    }else{
        event.returnValue=false;
    }
}
//事件传递event参数获取元素节点，兼容浏览器。
function getTarget(event){
    return event.target || event.srcElement;
}
//each遍历函数，兼容浏览器。
function each(arr, callback, thisp) {
    //js兼容的遍历函数
    if (arr.forEach) {arr.forEach(callback, thisp);} 
    else { for (var i = 0, len = arr.length; i < len; i++) callback.call(thisp, arr[i], i, arr);}
}
//获取下一个兄弟元素节点，过滤文本和空格。
function getNextNode(x){
    //获取目标下一个兄弟元素。
    var n = x.nextSibling;
    if(n && n.nodeType!=1){
        n=n.nextSibling;
    }
    return n;
}
//通过classname获取元素节点集合。
function getByClass(cls,parent){
    //cls为className，parent为父节点ID，若parent为空则默认document。
    var oParent=parent?parent:document,
    eles=[],
    elements=oParent.getElementsByTagName('*');
    for(var i=0,l=elements.length;i<l;i++){
        var tmpCls=elements[i].className.baseVal?elements[i].className.baseVal:elements[i].className;
        if(tmpCls.split(" ").indexOf(cls)>-1){
            eles.push(elements[i]);
        }
    }
    return eles;
    tmpCls=null;
}
//简化getById
function getById(id){
    return document.getElementById(id);
}
//获取元素当前某个样式的值，兼容浏览器。
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}
//设置元素对象的class值和删除class值。
function hasClass(obj,cls){
    if(obj.className){
        var classArr=obj.className.split(" ");
        index=classArr.indexOf(cls);
        if(index>-1){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}
function removeClass (obj, cls) {
    var classArr=obj.className.split(" ");
    index=classArr.indexOf(cls);
    if (hasClass(obj,cls)){
        classArr.splice(index,1);
        obj.className=classArr.join(" ");
    }
}
function addClass (obj, cls) {
    if(!hasClass(obj,cls)){
        obj.className+=" "+cls;
    }
}
//获取页面滚动的高度。
// var top = document.documentElement.scrollTop || document.body.scrollTop;
//ajax的get方法兼容性配置。
var ajaxGet = function(url,callback){
    var _xhr = null;
    if(window.XMLHttpRequest){
        _xhr = new window.XMLHttpRequest();
    }else if (window.ActiveXObject){
        _xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }
    _xhr.onreadystatechange = function(){
        if (_xhr.readyState == 4 && _xhr.status == 200 ) {
            callback(_xhr.responseText);
        }
    }
    _xhr.open('GET', url, true);
    _xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
    _xhr.send(null);
}
//获取元素距离文档顶部和左边的距离。
var getElementTop = function(element){
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while( current !== null){
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}
var getElementLeft = function(element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while( current !== null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}
//事件委托（批量给多元素节点绑定事件）
var delegateEvent = function(target, event,fn){
    addEvent(document,event,function(e){
        if(e.target.nodeName == target.toUpperCase()){
            fn.call(e.target);
        }
    });
}
//动画框架
function startMove(obj,json,fn){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var flag=true;
        for(var m in json){
            if(m=="opacity"){
                cust=Math.round(parseFloat(getStyle(obj,m))*100);
            }else if(m=="scrollTop"){
                cust=parseInt(obj[m]);
            }else{
                cust=parseInt(getStyle(obj,m));
            }
            if(json[m]>cust){
                speed=Math.ceil((json[m]-cust)/5);
            }else{
                speed=Math.floor((json[m]-cust)/5);
            }
            if(cust!=json[m]){
                flag=false;
            }
            if(m=="opacity"){
                obj.style.filter="alpha(opacity="+cust+speed+")";
                obj.style.opacity=(cust+speed)/100;
            }else if(m=="scrollTop"){
                obj[m]=(cust+speed);
            }else{
                obj.style[m]=(cust+speed)+"px";
            }
        }
        if(flag){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    },20);
}

//md5.min.js
!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t),e=(n>>16)+(t>>16)+(r>>16);return e<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[(r+64>>>9<<4)+14]=r;var e,i,a,h,d,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,h=v,d=m,l=o(l,g,v,m,n[e],7,-680876936),m=o(m,l,g,v,n[e+1],12,-389564586),v=o(v,m,l,g,n[e+2],17,606105819),g=o(g,v,m,l,n[e+3],22,-1044525330),l=o(l,g,v,m,n[e+4],7,-176418897),m=o(m,l,g,v,n[e+5],12,1200080426),v=o(v,m,l,g,n[e+6],17,-1473231341),g=o(g,v,m,l,n[e+7],22,-45705983),l=o(l,g,v,m,n[e+8],7,1770035416),m=o(m,l,g,v,n[e+9],12,-1958414417),v=o(v,m,l,g,n[e+10],17,-42063),g=o(g,v,m,l,n[e+11],22,-1990404162),l=o(l,g,v,m,n[e+12],7,1804603682),m=o(m,l,g,v,n[e+13],12,-40341101),v=o(v,m,l,g,n[e+14],17,-1502002290),g=o(g,v,m,l,n[e+15],22,1236535329),l=u(l,g,v,m,n[e+1],5,-165796510),m=u(m,l,g,v,n[e+6],9,-1069501632),v=u(v,m,l,g,n[e+11],14,643717713),g=u(g,v,m,l,n[e],20,-373897302),l=u(l,g,v,m,n[e+5],5,-701558691),m=u(m,l,g,v,n[e+10],9,38016083),v=u(v,m,l,g,n[e+15],14,-660478335),g=u(g,v,m,l,n[e+4],20,-405537848),l=u(l,g,v,m,n[e+9],5,568446438),m=u(m,l,g,v,n[e+14],9,-1019803690),v=u(v,m,l,g,n[e+3],14,-187363961),g=u(g,v,m,l,n[e+8],20,1163531501),l=u(l,g,v,m,n[e+13],5,-1444681467),m=u(m,l,g,v,n[e+2],9,-51403784),v=u(v,m,l,g,n[e+7],14,1735328473),g=u(g,v,m,l,n[e+12],20,-1926607734),l=c(l,g,v,m,n[e+5],4,-378558),m=c(m,l,g,v,n[e+8],11,-2022574463),v=c(v,m,l,g,n[e+11],16,1839030562),g=c(g,v,m,l,n[e+14],23,-35309556),l=c(l,g,v,m,n[e+1],4,-1530992060),m=c(m,l,g,v,n[e+4],11,1272893353),v=c(v,m,l,g,n[e+7],16,-155497632),g=c(g,v,m,l,n[e+10],23,-1094730640),l=c(l,g,v,m,n[e+13],4,681279174),m=c(m,l,g,v,n[e],11,-358537222),v=c(v,m,l,g,n[e+3],16,-722521979),g=c(g,v,m,l,n[e+6],23,76029189),l=c(l,g,v,m,n[e+9],4,-640364487),m=c(m,l,g,v,n[e+12],11,-421815835),v=c(v,m,l,g,n[e+15],16,530742520),g=c(g,v,m,l,n[e+2],23,-995338651),l=f(l,g,v,m,n[e],6,-198630844),m=f(m,l,g,v,n[e+7],10,1126891415),v=f(v,m,l,g,n[e+14],15,-1416354905),g=f(g,v,m,l,n[e+5],21,-57434055),l=f(l,g,v,m,n[e+12],6,1700485571),m=f(m,l,g,v,n[e+3],10,-1894986606),v=f(v,m,l,g,n[e+10],15,-1051523),g=f(g,v,m,l,n[e+1],21,-2054922799),l=f(l,g,v,m,n[e+8],6,1873313359),m=f(m,l,g,v,n[e+15],10,-30611744),v=f(v,m,l,g,n[e+6],15,-1560198380),g=f(g,v,m,l,n[e+13],21,1309151649),l=f(l,g,v,m,n[e+4],6,-145523070),m=f(m,l,g,v,n[e+11],10,-1120210379),v=f(v,m,l,g,n[e+2],15,718787259),g=f(g,v,m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,h),m=t(m,d);return[l,g,v,m]}function a(n){var t,r="";for(t=0;t<32*n.length;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function h(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;for(t=0;t<8*n.length;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function d(n){return a(i(h(n),8*n.length))}function l(n,t){var r,e,o=h(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;16>r;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(h(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="0123456789abcdef",o="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),o+=e.charAt(t>>>4&15)+e.charAt(15&t);return o}function v(n){return unescape(encodeURIComponent(n))}function m(n){return d(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}"function"==typeof define&&define.amd?define(function(){return A}):"object"==typeof module&&module.exports?module.exports=A:n.md5=A}(this);
//# sourceMappingURL=md5.min.js.map
