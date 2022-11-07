/*
url-loading object and a request queue built on top of it
*/

/* namespacing object */
var net=new Object();

net.READY_STATE_UNINITIALIZED=0;
net.READY_STATE_LOADING=1;
net.READY_STATE_LOADED=2;
net.READY_STATE_INTERACTIVE=3;
net.READY_STATE_COMPLETE=4;


/*--- content loader object for cross-browser requests ---*/
net.ContentForm=function(idForm,url,onload,onerror,contentType)
{

var formElements = document.getElementById(idForm).elements;
var values = toQueryString(formElements);
//var values = "";
var queryString = values;

var metodo=document.getElementById(idForm).getAttribute("method");
if(metodo == "GET")
	{
   	var loader = new  net.ContentLoader(url+"?"+queryString,onload,onerror,"GET",null,contentType);
	} 
else
	{ 
	  var loader = new net.ContentLoader(url,onload,onerror,"POST",queryString,contentType); 	
	}
	
}
/**********************************************************/

function toQueryString(elements) {
        
	var node = null
  	var qs = ""
  	var name = ""
    var tempString = ""
    
    for(var i = 0; i < elements.length; i++) {
		    
	    tempString = ""
        node = elements[i]
        name = node.getAttribute("name")

        //use id if name is null
        if (!name) {
        	name = node.getAttribute("id")
        }

        if(node.tagName.toLowerCase() == "input") {
        	if(node.type.toLowerCase() == "radio" || node.type.toLowerCase() == "checkbox") {
            	if(node.checked) {
                	tempString = name + "=" + node.value
                }
            }

            if(node.type.toLowerCase() == "text" || node.type.toLowerCase() == "hidden" || node.type.toLowerCase() == "password") {
            	tempString = name + "=" + encodeURIComponent(node.value)
            }
            
            if(node.type.toLowerCase() == "file") {
	
	            this.boundaryString = "AaB03x"
	            
				tempString = "--"+this.boundaryString + '\r\n' 
				+ 'Content-Disposition: form-data; name="archivo"; filename="' 
				+ node.value + '"' + '\r\n' 
				+ 'Content-Type: text/plain'
				+'\r\n'
				+'\r\n'
				+ "Hola como estas"
				+ '\r\n'
				+ "--"+this.boundaryString;
            }
       	}
        else
        	if(node.tagName.toLowerCase() == "select") {
                tempString = name + "=" + node.value;//getSelectedOptions(node)
           }
            else
            	if(node.tagName.toLowerCase() == "textarea") {
                	tempString = name + "=" + node.value
            	}

        if(tempString != "") {
        	if(qs == "") {
            	qs = tempString
            }
            else {
            	qs = qs + "&" + tempString
            }
        }
    }
    
    return qs
}
/************************************************/
net.ContentLoader=function(url,onload,onerror,method,params,contentType){

  this.req=null;
  this.onload=onload;
  this.onerror=(onerror) ? onerror : this.defaultError;
  this.loadXMLDoc(url,method,params,contentType);
}

net.ContentLoader.prototype.loadXMLDoc=function(url,method,params,contentType){
  if (!method){
    method="GET";
  }
  if (!contentType && method=="POST"){
    contentType='application/x-www-form-urlencoded';
  }
  if (window.XMLHttpRequest){
    this.req=new XMLHttpRequest();
  } else if (window.ActiveXObject){
    this.req=new ActiveXObject("Microsoft.XMLHTTP");
  }
  if (this.req){
    try{
      var loader=this;
      this.req.onreadystatechange=function(){
        net.ContentLoader.onReadyState.call(loader);
      }
      this.req.open(method,url,true);
      if (contentType){
        this.req.setRequestHeader('Content-Type', contentType);
      }
      this.req.send(params);
    }catch (err){
      this.onerror.call(this);
    }
  }
}


net.ContentLoader.onReadyState=function(){
  var req=this.req;
  var ready=req.readyState;

  if (ready==net.READY_STATE_COMPLETE){
    var httpStatus=req.status;

    if (httpStatus==200 || httpStatus==0){
      this.onload.call(this);
    }else{
      this.onerror.call(this);
    }
  }
}

net.ContentLoader.prototype.defaultError=function(){
return;
  alert("error fetching data!"
    +"\n\nreadyState:"+this.req.readyState
    +"\nstatus: "+this.req.status
    +"\nheaders: "+this.req.getAllResponseHeaders());
}


function mostrarLoad(op){
	if(op==1){
		document.getElementById("cargando").style.display="block";
		document.getElementById("cargando").style.visibility="visible";
		document.getElementById("cargando").style.left = (screen.width)/2;
		document.getElementById("cargando").style.top = (screen.height)/3;
	}
	else{
		document.getElementById("cargando").style.display="none";
		document.getElementById("cargando").style.visibility="hidden";
	}
}