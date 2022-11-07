// JavaScript Document
var xmlHttp;
function AJAX(){ 
    var xmlhttp=false; 
    try{ 
        xmlhttp=new ActiveXObject("Msxml2.XMLHTTP"); 
    }
    catch(e){ 
        try{ 
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); 
        } 
        catch(E){
			xmlhttp=false;
		}
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined'){
		xmlhttp=new XMLHttpRequest();
	} 
    return xmlhttp; 
};

function rendertable(div){	
	var element = div;
	while(element.childNodes.length){
    	element.removeChild(element.lastChild);
  	}					
};

function cargaLink(url,ele,param){
	if(ele.hasChildNodes()){
   		rendertable(ele);
   	}
	
	var ajax = AJAX();
	var url = url;
	ajax.open("GET", url, true);
	ajax.onreadystatechange = function(){
		if(ajax.readyState < 4){
				
		}
		else if(ajax.readyState == 4) { 
			if (ajax.status == 200){
				//ele.innerHTML = 
				return ajax.responseXML;
		   	}
		}
	}
	ajax.send(param);
}